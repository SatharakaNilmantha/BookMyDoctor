import React, { useEffect, useState } from 'react';
import './AppointmentPage.css';
import SideNav from '../../Components/SideNav/SideNav';
import axios from 'axios';
import { format } from 'date-fns';
import { Modal, Button } from 'react-bootstrap';
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaPhone, FaTimes ,FaEnvelope ,FaTimesCircle ,FaCheckCircle } from 'react-icons/fa';


function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/appointments/getAppointments');
      const rawAppointments = res.data;

      const filteredAppointments = rawAppointments.filter(app =>
        app.status === "accepted" || app.status === "canceled"
      );

      const enrichedAppointments = await Promise.all(
        filteredAppointments.map(async (appointment) => {
          let doctorDetails = {};
          let patientDetails = {};

          try {
            const doctorRes = await axios.get(`http://localhost:8080/api/doctors/${appointment.doctorId}`);
            doctorDetails = doctorRes.data;
          } catch (err) {
            doctorDetails.fullName = "N/A";
          }

          try {
            const patientRes = await axios.get(`http://localhost:8080/api/patient/${appointment.patientId}`);
            patientDetails = patientRes.data;
          } catch (err) {
            patientDetails.fullName = "N/A";
          }

          return {
            ...appointment,
            doctorDetails,
            patientDetails
          };
        })
      );

      setAppointments(enrichedAppointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
    
    if (!confirmDelete) {
      return; // Exit if user cancels
    }

    try {
      await axios.delete(`http://localhost:8080/api/appointments/${id}`);
      setAppointments(prev => prev.filter(app => app.appointmentId !== id));
      alert('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment');
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    if (!selectedAppointment) return;
    
    try {
      setActionLoading(true);
      const appointmentDto = {
        status: newStatus
      };

      // Update appointment status first
      await axios.put(
        `http://localhost:8080/api/appointments/${selectedAppointment.appointmentId}`,
        appointmentDto
      );

      // Get all notifications for this patient
      const notificationsResponse = await axios.get(
        `http://localhost:8080/api/notification/getNotificationByPatient/${selectedAppointment.patientId}`
      );
      
      const notifications = notificationsResponse.data;
      
      // Find the notification that matches this appointment's date/time
      const matchingNotification = notifications.find(notification => {
        if (!notification.appointmentDateTime) return false;

        const notificationDate = new Date(notification.appointmentDateTime);
        const appointmentDate = new Date(selectedAppointment.appointmentDateTime);
        
        // Consider notifications within 5 minutes of appointment time as matching
        return Math.abs(notificationDate - appointmentDate) < (5 * 60 * 1000);
      });

      if (matchingNotification) {

         // Get current time in Sri Lanka (UTC+5:30)
        const now = new Date();
        const sriLankaOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
        const sriLankaTime = new Date(now.getTime() + sriLankaOffset);
        
        let notificationData = {};

        if (newStatus === 'accepted') {
          notificationData = {
            text: "Appointment confirmed! Your consultation with the doctor is scheduled as planned.",
            type: "accepted",
            status: "unread",
            dateTime: sriLankaTime.toISOString()
          };
        } else if (newStatus === 'canceled') {
          notificationData = {
            text: "Doctor is unavailable due to emergency schedule conflict. Your appointment has been canceled.",
            type: "rejected",
            status: "unread",
            dateTime: sriLankaTime.toISOString()
          };
        }


        // Update the matching notification
        await axios.put(
          `http://localhost:8080/api/notification/${matchingNotification.notificationId}`,
          notificationData

          
        );
      }

      // Update the local state
      setAppointments(prevAppointments =>
        prevAppointments.map(app =>
          app.appointmentId === selectedAppointment.appointmentId
            ? { ...app, status: newStatus }
            : app
        )
      );

      setModalIsOpen(false);
      alert(`Appointment ${newStatus} successfully!`);
    } catch (error) {
      console.error(`Error ${newStatus} appointment:`, error);
      alert(`Failed to ${newStatus} appointment: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAccept = () => handleStatusUpdate('accepted');
  const handleCancel = () => handleStatusUpdate('canceled');

  // Filter appointments by search query
  const filteredAppointments = appointments.filter((appointment) => {
    const query = searchQuery.toLowerCase();
    return (
      appointment.doctorDetails.fullName.toLowerCase().includes(query) ||
      appointment.patientDetails.fullName.toLowerCase().includes(query) ||
      format(new Date(appointment.appointmentDateTime), 'yyyy-MM-dd hh:mm a').toLowerCase().includes(query) ||
      appointment.status.toLowerCase().includes(query)
    );
  });

  // Calculate totals based on filtered results
  const totalAccepted = filteredAppointments.filter(app => app.status === "accepted").length;
  const totalCanceled = filteredAppointments.filter(app => app.status === "canceled").length;

  return (
    <div className="app-container">
      <SideNav />
      <div className="content">
        <h1 className="dashboard-title">Doctor Appointment System</h1>
        <p className="dashboard-description">
          Displaying only accepted and canceled appointments.
        </p>

        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              className="input" 
              placeholder="Search by any detail (Doctor, Patient, Date/Time, Status)" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              style={{ flex: 1 }} 
            />
          </div>

          <div className="appointment-counts">
            <div className='acceptCount'>Accepted: {totalAccepted}</div>
            <div className='cancelCount'>Canceled: {totalCanceled}</div>
          </div>
        </div>

        <div className="action-table">
          <h3>Accepted and Canceled Appointments</h3>
          {loading ? (
            <p>Loading appointments...</p>
          ) : (
            <table>
              <thead className="table-header">
                <tr>
                  <th>Doctor Name</th>
                  <th>Patient Name</th>
                  <th>Appointment Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.appointmentId}>
                      <td>
                        <p className='table-row'>
                          <img
                            className='table-image'
                            src={`http://localhost:8080/api/doctors/image/${appointment.doctorId}`}
                            alt="Doctor"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/default-doctor.png';
                            }}
                          />
                          {appointment.doctorDetails?.fullName || "N/A"}
                        </p>
                      </td>
                      <td>
                        <p className='table-row'>
                          <img
                            className='table-image'
                            src={`http://localhost:8080/api/patient/image/${appointment.patientId}`}
                            alt="Patient"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/default-patient.png';
                            }}
                          />
                          {appointment.patientDetails?.fullName || "N/A"}
                        </p>
                      </td>
                      <td>{appointment.appointmentDateTime ? format(new Date(appointment.appointmentDateTime), 'yyyy-MM-dd hh:mm a') : "N/A"}</td>
                      <td>
                        <span className={`status-token ${appointment.status === "accepted" ? "status-accepted" : "status-canceled"}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button className="view-btn" onClick={() => handleView(appointment)}>View</button>
                        <button className="cancel-btn" onClick={() => handleDelete(appointment.appointmentId)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No matching appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Appointment Details Modal */}
        <Modal show={modalIsOpen} onHide={() => !actionLoading && setModalIsOpen(false)} size="lg" centered backdrop="static" >
          {selectedAppointment ? (
            <>
              <Modal.Header className="border-0 pb-0 ">
                <Modal.Title className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="m-0 ">Appointment Details</h4>
                  
                    <Button 
                      variant="link" 
                      onClick={() => setModalIsOpen(false)}
                      disabled={actionLoading}
                      className="text-muted p-0"
                    >
                      <FaTimes size={20} />
                    </Button>
                  </div>
                </Modal.Title>
              </Modal.Header>
              <hr />
              <Modal.Body className="pt-0">
                <div className="row">

                  {/* Doctor Card */}
                  <div className="col-md-6 mb-4">
                    <div className="card doctor-card h-100 border-0 shadow-sm">
                      <div className="card-header border-0 doctor-head text-white d-flex align-items-center">
                        <FaUserMd className="me-2" />
                        <h5 className="m-0">Doctor Information</h5>
                      </div>
                      <div className="card-body d-flex align-items-center">
                        <img className="rounded-circle me-3" src={`http://localhost:8080/api/doctors/image/${selectedAppointment.doctorId}`} alt="Doctor" width="80" height="80" />
                        
                        <div>
                          <h5 className="mb-1">{selectedAppointment.doctorDetails?.fullName || "N/A"}</h5>
                            <span className=""> {selectedAppointment.doctorDetails.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patient Card */}
                  <div className="col-md-6 mb-4">
                    <div className="card patient-card h-100 border-0 shadow-sm">
                      <div className="card-header border-0 patient-head text-white d-flex align-items-center">
                        <FaUserInjured className="me-2" />
                        <h5 className="m-0">Patient Information</h5>
                      </div>
                      <div className="card-body d-flex align-items-center">
                        <img className="rounded-circle me-3" src={`http://localhost:8080/api/patient/image/${selectedAppointment.patientId}`} alt="Patient" width="80"  height="80" />
                        <div>
                          <h5 className="mb-1">{selectedAppointment.patientDetails?.fullName || "N/A"}</h5>
                            <div className="d-flex flex-column ">
                              <div><FaPhone className=" fs-6" /> <span className='fs-6'>{selectedAppointment.patientDetails.phoneNumber}</span></div>
                              <div><FaEnvelope className=" fs-6" /> <span className='badge bg-light text-dark'>{selectedAppointment.patientDetails.email}</span></div>
                            </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">

                  {/* Appointment Time */}
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 appointment-card border-0 shadow-sm">
                      <div className="card-header border-0  appointment-head text-white d-flex align-items-center">
                        <FaCalendarAlt className="me-2" />
                        <h5 className="m-0">Appointment Time</h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center py-3">
                          <h4 className="text-dark"> { format(new Date(selectedAppointment.appointmentDateTime), 'EEEE, MMMM do yyyy') || "N/A"}</h4>
                          <h3 className="text-dark"> {format(new Date(selectedAppointment.appointmentDateTime), 'h:mm a') || "N/A"}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-md-6 mb-4">
                    <div className="card  h-100 status-card border-0 shadow-sm">
                      <div className="card-header border-0 status-head text-white d-flex align-items-center">
                        {selectedAppointment.status === "accepted" ? (
                          <FaCheckCircle className="me-2" /> // Green check for accepted
                        ) : (
                          <FaTimesCircle className="me-2" /> // Red X for canceled
                        )}
                        <h5 className="m-0">Appointment Status</h5>
                      </div>
                      <div className="card-body text-center d-flex flex-column justify-content-center">
                        <span className=" badge text-dark  fs-2 text-uppercase">{selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </Modal.Body>

              <Modal.Footer className="border-0">
                <div className="d-flex justify-content-between w-100">
                  <div>
                    <Button className="accept-btn " onClick={handleAccept} disabled={actionLoading || selectedAppointment.status === 'accepted'}> {actionLoading ? 'Processing...' : 'Accept Appointment'}  </Button>
                    <Button className="cancel-btn" onClick={handleCancel} disabled={actionLoading || selectedAppointment.status === 'canceled'}>  {actionLoading ? 'Processing...' : 'Cancel Appointment'}  </Button>
                  </div>
                  <Button variant="outline-secondary" onClick={() => setModalIsOpen(false)} disabled={actionLoading}> Close </Button>
                </div>
              </Modal.Footer>
            </>
          ) : (
            <Modal.Body>
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading appointment details...</p>
              </div>
            </Modal.Body>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default AppointmentPage;