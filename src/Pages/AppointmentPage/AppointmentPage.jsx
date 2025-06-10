import React, { useEffect, useState } from 'react';
import './AppointmentPage.css';
import SideNav from '../../Components/SideNav/SideNav';
import axios from 'axios';
import { format } from 'date-fns';

function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
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

    fetchAppointments();
  }, []);

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

  const handleView = (id) => {
    console.log("Viewing appointment:", id);
  };

  const handleDelete = (id) => {
    console.log("Deleting appointment:", id);
  };

  return (
    <div className="app-container">
      <SideNav />
      <div className="content">
        <h1 className="dashboard-title">Doctor Appointment System</h1>
        <p className="dashboard-description">
          Displaying only accepted and canceled appointments.
        </p>

        {/*--------------------------------------search bar section -------------------------------------------------*/}
      <div className="search-container">
        <div className="search-bar ">
          <input type="text" className="input" placeholder="Search by any detail (Doctor, Patient, Date/Time, Status)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1 }} />
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
                    <tr key={appointment.id}>
                      <td>
                        <p className='table-row'>
                          <img
                            className='table-image'
                            src={`http://localhost:8080/api/doctors/image/${appointment.doctorId}`}
                            alt=""
                          />
                          {appointment.doctorDetails?.fullName || "N/A"}
                        </p>
                      </td>
                      <td>
                        <p className='table-row'>
                          <img
                            className='table-image'
                            src={`http://localhost:8080/api/patient/image/${appointment.patientId}`}
                            alt=""
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
                        <button className="accept-btn" onClick={() => handleView(appointment.id)}>View</button>
                        <button className="cancel-btn" onClick={() => handleDelete(appointment.id)}>Delete</button>
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
      </div>
    </div>
  );
}

export default AppointmentPage;
