import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCalendarCheck, faUserMd, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import './SideNav.css';
import logo from '../Images/logo/logo1-removebg.png'


function SideNav() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
          <img src={logo} alt="logo remove background" className="logo" />
          <div>
             <h3 className="logo-brand ">BOOKMYDOCTOR</h3>
             <p  className="logo-subtitle">Medical center</p>
          </div>
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
