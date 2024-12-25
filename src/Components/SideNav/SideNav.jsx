import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCalendarCheck, faUserMd, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './SideNav.css';


function SideNav() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Doctor App
        
      </div>
      <ul className="sidebar-links">
        <li>
          <a href="#home" className="sidebar-link">
            <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#appointments" className="sidebar-link">
            <FontAwesomeIcon icon={faCalendarCheck} className="sidebar-icon" />
            <span>Appointments</span>
          </a>
        </li>
        <li>
          <a href="#doctors" className="sidebar-link">
            <FontAwesomeIcon icon={faUserMd} className="sidebar-icon" />
            <span>Doctors</span>
          </a>
        </li>
        <li>
          <a href="#patients" className="sidebar-link">
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            <span>Patients</span>
          </a>
        </li>
        <li>
          <a href="#contact" className="sidebar-link">
            <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
