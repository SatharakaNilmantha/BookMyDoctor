import React from 'react'
import './AppointmentPage.css'
import SideNav from '../../Components/SideNav/SideNav'

function AppointmentPage() {

    const appointments = [
        { 
          id: 1, 
          patientName: "John Doe", 
          patientAge: 35, 
          doctorName: "Dr. Emily Clark", 
          appointmentDateTime: "2024-12-26 10:00 AM", 
          doctorFees: 100,  
        },
        { 
          id: 2, 
          patientName: "Jane Smith", 
          patientAge: 29, 
          doctorName: "Dr. Robert Lee", 
          appointmentDateTime: "2024-12-26 11:30 AM", 
          doctorFees: 120, 
        },
        { 
          id: 3, 
          patientName: "Michael Johnson", 
          patientAge: 42, 
          doctorName: "Dr. Sarah Brown", 
          appointmentDateTime: "2024-12-26 1:00 PM", 
          doctorFees: 150, 
        },
      ];
      

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


          <div className="action-table1">
            <h3>All Appointments</h3>
            <table>
                <thead>
                <tr>
                    <th>Patient Name</th>
                    <th>Patient Age</th>
                    <th>Doctor Name</th>
                    <th>Appointment Date & Time</th>
                    <th>Doctor Fees</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.patientAge}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.appointmentDateTime}</td>
                    <td>${appointment.doctorFees}</td>
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
  )
}

export default AppointmentPage