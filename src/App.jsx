import React from "react";
import './App.css';
import SideNav from "./Components/SideNav/SideNav";

import { FaRegCalendarCheck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserInjured } from 'react-icons/fa';

function App() {

  const appointments = [
    {  id: 1,patientName: "John Doe", doctorName: "Dr. Emily Clark", appointmentTime: "10:00 AM", status: "Pending" },
    {  id: 2,patientName: "Jane Smith", doctorName: "Dr. Robert Lee", appointmentTime: "11:30 AM", status: "Pending" },
    {  id: 3,patientName: "Michael Johnson", doctorName: "Dr. Sarah Brown", appointmentTime: "1:00 PM", status: "Pending" },
  ];

  const handleAccept = (id) => {
    confirm(`Appointment for ${id} accepted.`);
    // Add functionality to update status in your database
  };

  const handleCancel = (id) => {
    confirm(`Appointment for ${id} canceled.`);
    // Add functionality to update status in your database
  };

  return (
    <>
      <div className="app-container">
        <SideNav />
        <div className="content">
         <div>
          <h1 className="dashboard-title">Welcome to Doctor Appointment System</h1>
          <p className="dashboard-description">
            Manage your appointments, doctors, and patients seamlessly.
          </p>

          <div className="dashboard-cards">
            <div className="card">
              <div className="card-icon blue">
                <FaRegCalendarCheck />
              </div>
              <div className="card-content">
                <h4 className="card-title">Active Appointments</h4>
                <h2 className="card-value">120</h2>
                <p className="card-subtitle error">Scheduled for Today</p>
              </div>
            </div>

            <div className="card">
              <div className="card-icon green">
                <FaUserDoctor />
              </div>
              <div className="card-content">
                <h4 className="card-title">Total Doctors</h4>
                <h2 className="card-value">45</h2>
                <p className="card-subtitle">Currently Registered</p>
              </div>
            </div>

            <div className="card">
              <div className="card-icon red">
                <FaUserInjured />
              </div>
              <div className="card-content">
                <h4 className="card-title">Registered Patients</h4>
                <h2 className="card-value">1,532</h2>
                <p className="card-subtitle">Total Registered Patients</p>
              </div>
            </div>
          </div>

          <div className="action-table">
            <h3>Latest Booking Appointments</h3>
            <table>
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Appointment Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.appointmentTime}</td>
                    <td>{appointment.status}</td>
                    <td>
                      <button className="accept-btn" onClick={() => handleAccept(appointment.id)}>Accept</button>
                      <button className="cancel-btn" onClick={() => handleCancel(appointment.id)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
