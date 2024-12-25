import React from "react";
import './App.css'
import SideNav from "./Components/SideNav/SideNav";


function App() {
  return (
    <>
      <div className="app-container">
        <SideNav />
        <div className="content">
          <h1>Welcome to Doctor Appointment System</h1>
          <p>Manage your appointments, doctors, and patients seamlessly.</p>
        </div>
      </div>
    </>
  );
}

export default App;
