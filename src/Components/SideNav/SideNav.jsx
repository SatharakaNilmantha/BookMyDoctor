import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faCalendarCheck, faUserMd, faUserInjured, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import './SideNav.css';
import logo from '../../Images/logo/logo1-removebg.png';

function SideNav() {
  function handleClick() {
    window.scrollTo({
      top: 0, // Scroll to the top
    });
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="logo remove background" className="logo" />
        <div>
          <h3 className="logo-brand">BOOKMYDOCTOR</h3>
          <p className="logo-subtitle">Medical Center</p>
        </div>
      </div>
      <ul className="sidebar-links">
        <li>
          <NavLink
            to="/"
            className="sidebar-link"
            onClick={handleClick}
            activeClassName="active"
            exact
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/appointment"
            className="sidebar-link"
            onClick={handleClick}
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="sidebar-icon" />
            <span>Appointments</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className="sidebar-link"
            onClick={handleClick}
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faUserMd} className="sidebar-icon" />
            <span>Doctors</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/patients"
            className="sidebar-link"
            onClick={handleClick}
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faUserInjured} className="sidebar-icon" />
            <span>Patients</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="sidebar-link"
            onClick={handleClick}
            activeClassName="active"
          >
            <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
            <span>Contact</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
