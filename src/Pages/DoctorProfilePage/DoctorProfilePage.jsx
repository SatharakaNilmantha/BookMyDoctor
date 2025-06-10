import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import './DoctorProfilePage.css';

import doctor from "../../Images/doctors/doctors-1.jpg";  // Default placeholder image

import { FaAnglesLeft } from "react-icons/fa6";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// PopupMessage component inside the same file for simplicity
const PopupMessage = ({ type, message }) => {
  useEffect(() => {
    if (message) {
      if (type === "success") toast.success(message, { position: "bottom-right" });
      else if (type === "error") toast.error(message, { position: "bottom-right" });
      else if (type === "warning") toast.warning(message, { position: "bottom-right" });
      else if (type === "info") toast.info(message, { position: "top-center" });
    }
  }, [type, message]);

  return <ToastContainer />;
};

function DoctorProfilePage() {
  const { id } = useParams(); // Get doctor id from route
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    eventKey: "",
    title: "",
    degree: "",
    description: "",
    gender: "",
    address: "",
    phoneNumber: "",
    fees: ""
  });

  const [shiftTimes, setShiftTimes] = useState({
    weekdayStart: "",
    weekdayEnd: "",
    weekendStart: "",
    weekendEnd: ""
  });

  const [profilePhoto, setProfilePhoto] = useState(doctor);

  const [isEditing, setIsEditing] = useState(false);

  // For popup messages
  const [popup, setPopup] = useState({ type: "", message: "" });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/doctors/${id}`)
      .then(res => {
        const doctor = res.data;
        setUserData({
          name: doctor.fullName || "N/A",
          eventKey: doctor.department || "N/A",
          title: doctor.title || "N/A",
          degree: doctor.degree || "N/A",
          description: doctor.description || "N/A",
          gender: doctor.gender || "N/A",
          address: doctor.address || "N/A",
          phoneNumber: doctor.phoneNumber || "N/A",
          fees: doctor.fees ? doctor.fees.toString() : "N/A",
        });
        setShiftTimes({
          weekdayStart: doctor.shiftStartTime ? doctor.shiftStartTime.slice(0, 5) : "N/A",
          weekdayEnd: doctor.shiftEndTime ? doctor.shiftEndTime.slice(0, 5) : "N/A",
          weekendStart: doctor.weekendStartTime ? doctor.weekendStartTime.slice(0, 5) : "N/A",
          weekendEnd: doctor.weekendEndTime ? doctor.weekendEndTime.slice(0, 5) : "N/A",
        });
        setProfilePhoto(`http://localhost:8080/api/doctors/image/${id}`);
      })
      .catch(err => {
        console.error("Failed to load doctor data", err);
        setPopup({ type: "error", message: "Failed to load doctor profile" });
      });
  }, [id]);

  const handleFieldChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const isValidSriLankanPhoneNumber = (phone) => /^07\d{8}$/.test(phone);

  const handleEditToggle = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const formatTimeWithSeconds = (time) => {
    if (!time || time === "N/A") return "00:00:00";
    return time.length === 5 ? time + ":00" : time;
  };

  // Add 6 hours to time string "HH:mm"
  const addSixHours = (timeStr) => {
    if (!timeStr) return "";
    const [hourStr, minStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10) + 6;
    if (hour >= 24) hour -= 24; // wrap around if past midnight
    // Pad with zero if needed
    const newHourStr = hour.toString().padStart(2, "0");
    return `${newHourStr}:${minStr}`;
  };

  // When start time changes, update end time automatically (+6 hours)
  const handleShiftStartChange = (field, value) => {
    setShiftTimes(prev => {
      const newShiftTimes = { ...prev, [field]: value };
      // Map start to corresponding end field:
      if (field === "weekdayStart") {
        newShiftTimes.weekdayEnd = addSixHours(value);
      } else if (field === "weekendStart") {
        newShiftTimes.weekendEnd = addSixHours(value);
      }
      return newShiftTimes;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!isValidSriLankanPhoneNumber(userData.phoneNumber)) {
      setPopup({ type: "warning", message: "Please enter a valid Sri Lankan phone number (e.g., 0761234567)" });
      return;
    }

    const confirmed = window.confirm("Do you want to save the changes?");
    if (!confirmed) return;

    try {
      await axios.put(`http://localhost:8080/api/doctors/${id}`, {
        fullName: userData.name,
        department: userData.eventKey,
        title: userData.title,
        degree: userData.degree,
        description: userData.description,
        gender: userData.gender,
        address: userData.address,
        phoneNumber: userData.phoneNumber,
        fees: userData.fees,
        shiftStartTime: formatTimeWithSeconds(shiftTimes.weekdayStart),
        shiftEndTime: formatTimeWithSeconds(shiftTimes.weekdayEnd),
        weekendStartTime: formatTimeWithSeconds(shiftTimes.weekendStart),
        weekendEndTime: formatTimeWithSeconds(shiftTimes.weekendEnd),
        status: "Active"
      });
      setPopup({ type: "success", message: "Doctor details updated successfully!" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating doctor details:", error);
      setPopup({ type: "error", message: "Failed to update doctor details." });
    }
  };

    const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const confirmUpload = window.confirm("Are you sure you want to update the doctor's image?");
    if (!confirmUpload) return;  // User cancelled

    const formData = new FormData();
    formData.append("image", file);

    try {
        await axios.put(`http://localhost:8080/api/doctors/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        });

        const previewUrl = URL.createObjectURL(file);
        setProfilePhoto(previewUrl);
        setPopup({ type: "success", message: "Doctor image updated successfully!" });

        // Clean up object URL on unmount or next change
        return () => URL.revokeObjectURL(previewUrl);
    } catch (error) {
        console.error("Error uploading image:", error);
        setPopup({ type: "error", message: "Failed to update profile image." });
    }
    };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
   <>
    <div className="profile-page">
      {/* Toast Container */}
      <PopupMessage type={popup.type} message={popup.message} />

      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-header">
          <img className="profile-photo" src={profilePhoto} alt="Profile" />
          <div className="profile-info">
            <h2>Personalize Your Account</h2>
            <p>Your profile photo will appear on apps and devices that use your account.</p>
            <label className="upload-btn">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="profile-details-card">
        <h3>Profile Information</h3>

        {/* Name */}
        <div className="profile-row">
          <label className="field-label">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              className="editable-input"
              value={userData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              required
            />
          ) : (
            <span className="field-value">{userData.name}</span>
          )}
        </div>

        {/* Department */}
        <div className="profile-row">
          <label className="field-label">Department</label>
          {isEditing ? (
            <select
              className="editable-input"
              value={userData.eventKey}
              onChange={(e) => handleFieldChange("eventKey", e.target.value)}
              required
            >
              <option value="" disabled>Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Hepatology">Hepatology</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Ophthalmology">Ophthalmology</option>
            </select>
          ) : (
            <span className="field-value">{userData.eventKey}</span>
          )}
        </div>

        {/* Title */}
        <div className="profile-row">
          <label className="field-label">Title</label>
          {isEditing ? (
            <input
              type="text"
              className="editable-input"
              value={userData.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              required
            />
          ) : (
            <span className="field-value">{userData.title}</span>
          )}
        </div>

        {/* Degree */}
        <div className="profile-row">
          <label className="field-label">Degree</label>
          {isEditing ? (
            <input
              type="text"
              className="editable-input"
              value={userData.degree}
              onChange={(e) => handleFieldChange("degree", e.target.value)}
              required
            />
          ) : (
            <span className="field-value">{userData.degree}</span>
          )}
        </div>

        {/* Description */}
        <div className="profile-row">
          <label className="field-label">Description</label>
          {isEditing ? (
            <textarea className="editable-input"  maxLength={100} value={userData.description} onChange={(e) => handleFieldChange("description", e.target.value)} required/>
          ) : (
            <span className="field-value">{userData.description}</span>
          )}
        </div>

        {/* Gender */}
        <div className="profile-row">
          <label className="field-label">Gender</label>
          {isEditing ? (
            <select className="editable-input" value={userData.gender} onChange={(e) => handleFieldChange("gender", e.target.value)}  required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span className="field-value">{userData.gender}</span>
          )}
        </div>

        {/* Address */}
        <div className="profile-row">
          <label className="field-label">Address</label>
          {isEditing ? (
            <textarea  className="editable-input" value={userData.address} onChange={(e) => handleFieldChange("address", e.target.value)} required />
          ) : (
            <span className="field-value">{userData.address}</span>
          )}
        </div>

        {/* Phone Number */}
        <div className="profile-row">
          <label className="field-label">Phone Number</label>
          {isEditing ? (
            <input  type="text"   className="editable-input" value={userData.phoneNumber} onChange={(e) => handleFieldChange("phoneNumber", e.target.value)} required />
          ) : (
            <span className="field-value">{userData.phoneNumber}</span>
          )}
        </div>

        {/* Fees */}
        <div className="profile-row">
          <label className="field-label">Fees</label>
          {isEditing ? (
            <input  type="text"  className="editable-input"  value={userData.fees}  onChange={(e) => handleFieldChange("fees", e.target.value)}   required  />
          ) : (
            <span className="field-value">$ {userData.fees}</span>
          )}
        </div>

        {/* Weekday Shift */}
        <div className="profile-row" style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
            <label className="field-label">Weekday Shift Start</label>
            <input
            type="time"
            name="weekdayStart"
            className="editable-input"
            value={shiftTimes.weekdayStart === "N/A" ? "" : shiftTimes.weekdayStart}
            onChange={(e) => handleShiftStartChange("weekdayStart", e.target.value)}
            required
            readOnly={!isEditing}  // editable if isEditing = true
            />
        </div>
        <div style={{ flex: 1 }}>
            <label className="field-label">Weekday Shift End</label>
            <input  type="time" name="weekdayEnd"className="editable-input" value={shiftTimes.weekdayEnd === "N/A" ? "" : shiftTimes.weekdayEnd}   onChange={(e) => setShiftTimes(prev => ({ ...prev, weekdayEnd: e.target.value })) } required  readOnly={true}  />
        </div>
        </div>

        {/* Weekend Shift */}
        <div className="profile-row" style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
            <label className="field-label">Weekend Shift Start</label>
            <input type="time" name="weekendStart" className="editable-input" value={shiftTimes.weekendStart === "N/A" ? "" : shiftTimes.weekendStart} onChange={(e) => handleShiftStartChange("weekendStart", e.target.value)} required  readOnly={!isEditing}  />
        </div>
        <div style={{ flex: 1 }}>
            <label className="field-label">Weekend Shift End</label>
            <input type="time" name="weekendEnd" className="editable-input" value={shiftTimes.weekendEnd === "N/A" ? "" : shiftTimes.weekendEnd}onChange={(e) =>setShiftTimes(prev => ({ ...prev, weekendEnd: e.target.value })) } required readOnly={true}  />
        </div>
        </div>

        {/* Edit, Save and Back Links */}
        <div className="action-links">
            {!isEditing ? (
                 <>
                    <button className="back-button" onClick={handleBackClick}><FaAnglesLeft />Back</button>
                    <a href="#" className="link edit-link" onClick={handleEditToggle}>Edit</a>   
                </>
            ) : (
                <>
                  <button className="back-button" onClick={handleBackClick}><FaAnglesLeft />Back</button>
                   <a href="#" className="link save-link" onClick={handleSave}>Save</a> 
                 </>
             )}
        </div>
     </div>
    </div>
    {/* Toast Message */}
    <PopupMessage type={toast.type} message={toast.message} />
   </>
  );
}

export default DoctorProfilePage;
