import React, { useEffect, useState, useCallback } from 'react';
import './PatientContactPage.css';
import SideNav from '../../Components/SideNav/SideNav';
import axios from 'axios';
import { format, isTomorrow, parseISO, isValid } from 'date-fns';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaPhone, FaEnvelope, FaSms } from 'react-icons/fa';

function PatientContactPage() {

  // State variables
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [smsContent, setSmsContent] = useState('');
  const [smsSending, setSmsSending] = useState(false);


  // Fetch appointments from the server
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get('http://localhost:8080/api/appointments/getAppointments');
      const rawAppointments = res.data;

      // Filter only accepted appointments that are scheduled for tomorrow
      const filteredAppointments = rawAppointments.filter(app => {
        try {
          if (app.status !== "accepted") return false;
          
          const date = parseISO(app.appointmentDateTime);
          return isValid(date) && isTomorrow(date);
        } catch (e) {
          console.error("Error parsing date for appointment:", app);
          return false;
        }
      });

      // Sort appointments by appointmentId in descending order
      filteredAppointments.sort((a, b) => b.appointmentId - a.appointmentId);

      const enrichedAppointments = await Promise.all(
        filteredAppointments.map(async (appointment) => {
          try {
            const [doctorRes, patientRes] = await Promise.all([
              axios.get(`http://localhost:8080/api/doctors/${appointment.doctorId}`),
              axios.get(`http://localhost:8080/api/patient/${appointment.patientId}`)
            ]);
            
            return {
              ...appointment,
              doctorDetails: doctorRes.data || { fullName: "N/A", title: "" },
              patientDetails: patientRes.data || { fullName: "N/A", phoneNumber: "", email: "" }
            };
          } catch (err) {
            console.error("Error fetching details for appointment:", appointment.appointmentId, err);
            return {
              ...appointment,
              doctorDetails: { fullName: "N/A", title: "" },
              patientDetails: { fullName: "N/A", phoneNumber: "", email: "" }
            };
          }
        })
      );

      setAppointments(enrichedAppointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
    return () => {
      // Cleanup if needed
    };
  }, [fetchAppointments]);

  //  Function to format phone numbers
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return null;
    
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if number starts with 94 (without +) and has 11 digits
    if (cleaned.length === 11 && cleaned.startsWith('94')) {
      return `+${cleaned}`;
    }
    
    // Check if number starts with 0 and has 10 digits
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
      return `+94${cleaned.substring(1)}`;
    }
    
    // Check if number has 9 digits (without prefix)
    if ((cleaned.length === 9)) {
      return `+94${cleaned}`;
    }
    
    // Return null for invalid formats
    return null;
  };

  // Function to send SMS
  const sendSMS = async (phoneNumber, message) => {
    try {
      const formattedNumber = formatPhoneNumber(phoneNumber);
      if (!formattedNumber) {
        throw new Error("Invalid phone number format");
      }

      const smsRequest = {
        destinationSMSPhoneNumber: formattedNumber,
        smsMessage: message
      };
      
      const response = await axios.post("http://localhost:8080/api/v1/sms/send", smsRequest);
      return { success: true, message: "SMS sent successfully" };
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw new Error(error.response?.data?.message || "Failed to send SMS");
    }
  };

  // Function to handle sending message
  const handleSendMessage = (appointment) => {
    setSelectedAppointment(appointment);
    
    try {
      const appointmentDate = appointment.appointmentDateTime ? 
        parseISO(appointment.appointmentDateTime) : null;
      
      let formattedDate = "N/A";
      let formattedTime = "N/A";
      let dayName = "N/A";
      
      if (appointmentDate && isValid(appointmentDate)) {
        dayName = format(appointmentDate, 'EEEE');
        formattedDate = format(appointmentDate, 'MMMM do yyyy');
        formattedTime = format(appointmentDate, 'h:mm a');
      }
      
      const defaultMessage = `Reminder: Your appointment with ${appointment.doctorDetails?.fullName || ""} is scheduled for ${dayName}, ${formattedDate} at ${formattedTime}. Please arrive on time.`;
      
      setSmsContent(defaultMessage);
      setModalIsOpen(true);
    } catch (e) {
      console.error("Error formatting default message:", e);
      setSmsContent(`Reminder: Your appointment with  ${appointment.doctorDetails?.fullName || ""} is scheduled for tomorrow. Please arrive on time.`);
      setModalIsOpen(true);
    }
  };

  // Function to handle sending SMS
  const handleSendSMS = async () => {
    if (!selectedAppointment || !smsContent.trim()) {
      alert("Please enter a message to send");
      return;
    }

    try {
      setSmsSending(true);
      await sendSMS(selectedAppointment.patientDetails?.phoneNumber, smsContent);
      alert("SMS sent successfully!");
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error sending SMS:", error);
      alert(error.message || "Failed to send SMS");
    } finally {
      setSmsSending(false);
    }
  };

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter((appointment) => {
    const query = searchQuery.toLowerCase();
    const doctorName = appointment.doctorDetails?.fullName?.toLowerCase() || "";
    const patientName = appointment.patientDetails?.fullName?.toLowerCase() || "";
    
    try {
      const dateTime = appointment.appointmentDateTime && isValid(parseISO(appointment.appointmentDateTime)) ? 
        format(parseISO(appointment.appointmentDateTime), 'yyyy-MM-dd hh:mm a').toLowerCase() : "";
      return (
        doctorName.includes(query) ||
        patientName.includes(query) ||
        dateTime.includes(query)
      );
    } catch (e) {
      return doctorName.includes(query) || patientName.includes(query);
    }
  });

  // Function to get image URL for doctors and patients
  const getImageUrl = (type, id) => {
    return `http://localhost:8080/api/${type}/image/${id}?${new Date().getTime()}`;
  };

  return (
    <>
    <div className="app-container">
      <SideNav />
      <div className="content">


        
        <h1 className="dashboard-title">Patient Reminder System</h1>
        <p className="dashboard-description">Send appointment reminders to patients with tomorrow's accepted appointments</p>

        <div className="search-container">
          <div className="search-bar">
            <input  type="text"  className="input"  placeholder="Search by any detail (Name, Gender, Phone, Email)"  value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}  style={{ flex: 1 }}  />
          </div>
          <div className="patient-counts">
            <div className='totalCount'><h3>Total Patient: {filteredAppointments.length}</h3></div>
          </div>
        </div>

        <div className="action-table">
          <h3>Tomorrow's Accepted Appointments</h3>
          {loading ? (
            <div className="text-center py-4">
              <p>Loading appointments...</p>
            </div>
          ) : (
            <div>
              <table>
                <thead className="table-header">
                  <tr>
                    <th>Doctor Name</th>
                    <th>Patient Name</th>
                    <th>Patient Phone</th>
                    <th>Appointment Date & Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => {
                      const appointmentDate = appointment.appointmentDateTime ? 
                        parseISO(appointment.appointmentDateTime) : null;
                      const isValidDate = appointmentDate && isValid(appointmentDate);

                      return (
                        <tr key={appointment.appointmentId}>
                          <td>
                            <div className='table-row'>
                              <img   className='table-image'   src={getImageUrl('doctors', appointment.doctorId)}  alt="Doctor"/> {appointment.doctorDetails?.fullName || "N/A"}
                            </div>
                          </td>
                          <td>
                            <div className='table-row'>
                              <img className='table-image' src={getImageUrl('patient', appointment.patientId)} alt="Patient" /> {appointment.patientDetails?.fullName || "N/A"}
                            </div>
                          </td>
                          <td>{appointment.patientDetails?.phoneNumber ? formatPhoneNumber(appointment.patientDetails.phoneNumber) : "N/A"}</td>
                          <td> {isValidDate ?  format(appointmentDate, 'yyyy-MM-dd hh:mm a') : "N/A"}
                          </td>
                          <td>
                            <button  className="btn sms-btn btn-sm"  onClick={() => handleSendMessage(appointment)} disabled={!appointment.patientDetails?.phoneNumber} > <FaSms  className='fs-6 me-1' /> Send Reminder  </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        {appointments.length === 0 
                          ? "No accepted appointments for tomorrow found." 
                          : "No matching appointments found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Modal show={modalIsOpen} onHide={() => !smsSending && setModalIsOpen(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <FaSms className="me-2 text-primary" />
              Send Appointment Reminder
            </Modal.Title>
          </Modal.Header>
          
          <Modal.Body className="mt-4">
            {selectedAppointment && (
              <>
                <div className="row">

                  <div className="col-md-6 mb-4">
                    <div className="card doctor-card h-100 border-0 shadow-sm">
                      <div className="card-header border-0 doctor-head text-white d-flex align-items-center">
                        <FaUserMd className="me-2" />
                        <h5 className="m-0">Doctor Information</h5>
                      </div>
                      <div className="card-body d-flex align-items-center">
                        <img 
                          className="rounded-circle me-3" 
                          src={getImageUrl('doctors', selectedAppointment.doctorId)} 
                          alt="Doctor" 
                          width="80" 
                          height="80"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-doctor.png';
                          }}
                        />
                        <div>
                          <h5 className="mb-1">{selectedAppointment.doctorDetails?.fullName || "N/A"}</h5>
                          <span className=""> {selectedAppointment.doctorDetails?.title || ""}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="card patient-card h-100 border-0 shadow-sm">
                      <div className="card-header border-0 patient-head text-white d-flex align-items-center">
                        <FaUserInjured className="me-2" />
                        <h5 className="m-0">Patient Information</h5>
                      </div>
                      <div className="card-body d-flex align-items-center">
                        <img 
                          className="rounded-circle me-3" 
                          src={getImageUrl('patient', selectedAppointment.patientId)} 
                          alt="Patient" 
                          width="80" 
                          height="80"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-patient.png';
                          }}
                        />
                        <div>
                          <h5 className="mb-1">{selectedAppointment.patientDetails?.fullName || "N/A"}</h5>
                          <div className="d-flex flex-column">
                            <div><FaPhone className="fs-6" /> <span className='fs-6'>{selectedAppointment.patientDetails?.phoneNumber || "N/A"}</span></div>
                            <div><FaEnvelope className="fs-6" /> <span className='badge bg-light text-dark'>{selectedAppointment.patientDetails?.email || "N/A"}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row mt-1">

                  <div className="col-md-6 mb-4">
                    <div className="card  appointment-card border-0 shadow-sm">
                      <div className="card-header border-0 appointment-head text-white d-flex align-items-center">
                        <FaCalendarAlt className="me-2" />
                        <h5 className="m-0">Appointment Time</h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center py-5 ">
                          <h4 className="text-dark"> {format(new Date(selectedAppointment.appointmentDateTime), 'EEEE, MMMM do yyyy') || "N/A"}</h4>
                          <h3 className="text-primary"> {format(new Date(selectedAppointment.appointmentDateTime), 'h:mm a') || "N/A"}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="card  sms-card border-0 shadow-sm">
                      <div className="card-header border-0 sms-head text-white d-flex align-items-center">
                        <FaSms className="me-2" />
                        <h5 className="m-0">Reminder Message</h5>
                      </div>
                      <div className="card-body">
                        <Form.Group controlId="smsMessage">
                          <div className='sms-textarea-container'>
                          <Form.Control as="textarea" className='sms-textarea' rows={5} value={smsContent} onChange={(e) => setSmsContent(e.target.value)} placeholder="Type your reminder message here..." maxLength={160}/>
                         </div>
                          <div className="text-end mt-3">
                            <small className={`text-muted ${smsContent.length > 150 ? 'text-warning' : ''}`}>  {smsContent.length}/160 characters </small>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setModalIsOpen(false)} disabled={smsSending}>
              Cancel
            </Button>
            <Button 
             className='sms-btn'
              onClick={handleSendSMS}
              disabled={smsSending || !smsContent.trim()}
            >
              {smsSending ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                <>
                  <FaSms className="me-2" />
                  Send SMS
                </>
              )}
            </Button>
          </Modal.Footer>
          
        </Modal>

      </div>
    </div>
   </>
  );
}

export default PatientContactPage;