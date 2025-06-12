import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import SideNav from "./Components/SideNav/SideNav";
import PopupMessage from "./Components/PopupMessage/popupMessage";

import { FaCalendarCheck, FaCalendarTimes, FaUserInjured, FaUserMd } from 'react-icons/fa';




function App() {
  const [appointments, setAppointments] = useState([]);
  const [popup, setPopup] = useState({ type: "", message: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingCount, setPendingCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/appointments/getAppointments");
      const appointmentsData = response.data;

      const pendingAppointments = appointmentsData.filter(app => app.status === "pending");
      const acceptedAppointments = appointmentsData.filter(app => app.status === "accepted");
      const canceledAppointments = appointmentsData.filter(app => app.status === "canceled");

      setPendingCount(pendingAppointments.length);
      setAcceptedCount(acceptedAppointments.length);
      setCanceledCount(canceledAppointments.length);

      const appointmentsWithDetails = await Promise.all(
        pendingAppointments.map(async (appointment) => {
          try {
            const doctorResponse = await axios.get(`http://localhost:8080/api/doctors/${appointment.doctorId}`);
            const patientResponse = await axios.get(`http://localhost:8080/api/patient/${appointment.patientId}`);

            return {
              ...appointment,
              doctorDetails: doctorResponse.data,
              patientDetails: patientResponse.data,
            };
          } catch (error) {
            return {
              ...appointment,
              doctorDetails: null,
              patientDetails: null,
            };
          }
        })
      );

      setAppointments(appointmentsWithDetails);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleAccept = async (appointmentId) => {
    setPopup({ type: "hidden", message: "" });

    if (window.confirm("Are you sure you want to accept this appointment?")) {
      try {
        const appointment = appointments.find(app => app.appointmentId === appointmentId);
        
        await axios.put(
          `http://localhost:8080/api/appointments/${appointmentId}`, 
          { status: "accepted" }
        );
        
        // Get current time in Sri Lanka (UTC+5:30)
        const now = new Date();
        const sriLankaOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
        const sriLankaTime = new Date(now.getTime() + sriLankaOffset);
        
        const notificationDto = {
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          appointmentDateTime: appointment.appointmentDateTime,
          text: "Appointment confirmed! Your consultation with the doctor is scheduled as planned.",
          type: "accepted",
          status: "unread",
          dateTime: sriLankaTime.toISOString() // Sri Lankan time in ISO format
        };
        
        await axios.post("http://localhost:8080/api/notification/saveNotification", notificationDto);
        
        setAppointments(appointments.filter(app => app.appointmentId !== appointmentId));
        setPendingCount(prev => prev - 1);
        setAcceptedCount(prev => prev + 1);
        setPopup({ type: "success", message: "Patient Appointment Accepted" });
      } catch (error) {
        console.error("Error accepting appointment:", error);
        setPopup({ type: "error", message: "Failed to update appointment." });
      }
    }
  };

  const handleCancel = async (appointmentId) => {
    setPopup({ type: "hidden", message: "" });

    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const appointment = appointments.find(app => app.appointmentId === appointmentId);
        
        await axios.put(
          `http://localhost:8080/api/appointments/${appointmentId}`, 
          { status: "canceled" }
        );
        
        // Get current time in Sri Lanka (UTC+5:30)
        const now = new Date();
        const sriLankaOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
        const sriLankaTime = new Date(now.getTime() + sriLankaOffset);
        
        const notificationDto = {
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          appointmentDateTime: appointment.appointmentDateTime,
          text: "Doctor is unavailable due to emergency schedule conflict",
          type: "rejected",
          status: "unread",
          dateTime: sriLankaTime.toISOString() // Sri Lankan time in ISO format
        };
        
        await axios.post("http://localhost:8080/api/notification/saveNotification", notificationDto);
        
        setAppointments(appointments.filter(app => app.appointmentId !== appointmentId));
        setPendingCount(prev => prev - 1);
        setCanceledCount(prev => prev + 1);
        setPopup({ type: "success", message:"Patient Appointment Canceled" });
      } catch (error) {
        console.error("Error canceling appointment:", error);
        setPopup({ type: "error", message: "Failed to update appointment." });
      }
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/doctors/getDoctor');
      setDoctors(response.data);
      setDoctorCount(response.data.length);
    } catch {
      setError('Error fetching doctors');
    }
  };

  // Filter appointments by any visible table data
  const filteredAppointments = appointments.filter((appointment) => {
    const doctorName = appointment.doctorDetails?.fullName?.toLowerCase() || "";
    const patientName = appointment.patientDetails?.fullName?.toLowerCase() || "";
    const status = appointment.status?.toLowerCase() || "";
    const appointmentDateTimeStr = appointment.appointmentDateTime
      ? new Date(appointment.appointmentDateTime).toLocaleString()
      : "";

    const query = searchQuery.toLowerCase();

    return (
      doctorName.includes(query) ||
      patientName.includes(query) ||
      status.includes(query) ||
      appointmentDateTimeStr.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="app-container">
        <SideNav />
        <div className="content">
          <div>
            <h1 className="dashboard-title">Welcome to Doctor Appointment System</h1>
            <p className="dashboard-description">Manage your appointments, doctors, and patients seamlessly.</p>


           {  /*--------------------------------------card section -------------------------------------------------*/ }
            <div className="card-section">
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">

                 
                 {/* Pending Appointments, Accepted Appointments, Canceled Appointments, Total Patients, Active Doctors */ }
                <div className="col">
                  <div className="card radius-10 border-start border-0 border-3 border-info">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-0 text-secondary">Active Appointments</p>
                        <h4 className="my-1 text-info">{pendingCount}</h4>
                        <p className="mb-0 font-13">Scheduled for today</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white"> <FaCalendarCheck /></div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card radius-10 border-start border-0 border-3 border-danger">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-0 text-secondary">Canceled Appointments</p>
                        <h4 className="my-1 text-danger">{canceledCount}</h4>
                        <p className="mb-0 font-13">Currently canceled</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white"><FaCalendarTimes/></div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card radius-10 border-start border-0 border-3 border-success">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-0 text-secondary">Total Patients</p>
                        <h4 className="my-1 text-success">{acceptedCount}</h4>
                        <p className="mb-0 font-13">Accepted appointments</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white"> <FaUserInjured /></div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card radius-10 border-start border-0 border-3 border-warning">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-0 text-secondary">Active Doctors</p>
                        <h4 className="my-1 text-warning">{doctorCount}</h4>
                        <p className="mb-0 font-13">Currently registered</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-blooker text-white"><FaUserMd  /></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/*--------------------------------------search bar section -------------------------------------------------*/ }
            <div className="search-bar mt-3 mb-3">
              <input  type="text"   className="input" placeholder="Search by any detail (Doctor, Patient, Date/Time, Status)" value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>

             { /*--------------------------------------table section -------------------------------------------------*/ }
            <div className="action-table">
              <h3>Latest Booking Appointments</h3>
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
                      <td ><p className='table-row'><img className='table-image' src={`http://localhost:8080/api/doctors/image/${appointment.doctorId}`} alt="" />{appointment.doctorDetails?.fullName || "N/A"}</p></td>
                      <td ><p className='table-row'><img className='table-image' src={`http://localhost:8080/api/patient/image/${appointment.patientId}`} alt="" />{appointment.patientDetails?.fullName || "N/A"}</p></td>
                       <td>{appointment.appointmentDateTime? (() => {
                                  const date = new Date(appointment.appointmentDateTime);
                                  const formattedDate = date.getFullYear() + "-" +
                                                        String(date.getMonth() + 1).padStart(2, '0') + "-" +
                                                        String(date.getDate()).padStart(2, '0');
                                  const formattedTime = date.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                  });
                                  return `${formattedDate} ${formattedTime}`;
                                })()
                              : "N/A"
                          }

                        </td>
                        <td><span className="status-token status-pending ">{appointment.status}</span></td>
                        <td>
                          <button
                            className="accept-btn"
                            onClick={() => handleAccept(appointment.appointmentId)}
                          >
                            Accept
                          </button>
                          <button
                            className="cancel-btn"
                            onClick={() => handleCancel(appointment.appointmentId)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No Latest Booking Appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
      <PopupMessage type={popup.type} message={popup.message} />
    </>
  );
}

export default App;
