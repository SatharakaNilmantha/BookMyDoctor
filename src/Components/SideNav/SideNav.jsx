import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faCalendarCheck, faUserMd,faUserInjured ,faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FiUser } from "react-icons/fi";



import './SideNav.css';
import logo from '../../Images/logo/logo1-removebg.png';
import profilePic from '../../Images/doctors/doctors-1.jpg';

function SideNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  function handleClick() {
    window.scrollTo({ top: 0 });
  }

  // Toggle dropdown open/close
  function toggleDropdown(e) {
    e.stopPropagation();  // prevent triggering document click
    setDropdownOpen(!dropdownOpen);
  }

  // Close dropdown when clicking outside profile section
  function handleDocumentClick(e) {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  }

  // Add and remove event listener dynamically
  React.useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [dropdownOpen]);

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
          <NavLink to="/" className="sidebar-link" onClick={handleClick} activeClassName="active" exact>
            <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/appointment" className="sidebar-link" onClick={handleClick} activeClassName="active">
            <FontAwesomeIcon icon={faCalendarCheck} className="sidebar-icon" />
            <span>Appointments</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors" className="sidebar-link" onClick={handleClick} activeClassName="active">
            <FontAwesomeIcon icon={faUserMd} className="sidebar-icon" />
            <span>Doctors</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/adddoctor" className="sidebar-link" onClick={handleClick} activeClassName="active">
            <IoPersonAddSharp className="sidebar-icon" />
            <span>Add Doctor</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/patients" className="sidebar-link" onClick={handleClick} activeClassName="active">
            <FontAwesomeIcon icon={faUserInjured} className="sidebar-icon" />
            <span>Patients</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="sidebar-link" onClick={handleClick} activeClassName="active">
            <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
            <span>Contact</span>
          </NavLink>
        </li>
      </ul>


         {/* User Account */}

      <div className="sidebar-profile" ref={profileRef} onClick={toggleDropdown}>
        <img src={profilePic} alt="Profile" className="profile-image" />
        <div className="profileinfo">
          <span className="profile-name">Dr. John Doe</span>
          <FaChevronDown className={`dropdown-icon ${dropdownOpen ? 'rotate' : ''}`} />
        </div>

        <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
          {dropdownOpen && (
            <ul>
              <li className="profile-link"><NavLink to="/profile" onClick={handleClick}><FiUser style={{ marginRight: '8px' }} />Profile</NavLink></li>
              <li className="logout-link"><NavLink to="/logout" onClick={handleClick}><FiLogOut style={{ marginRight: '8px' }} /> Logout</NavLink></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideNav;
