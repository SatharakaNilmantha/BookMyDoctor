import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../../Components/SideNav/SideNav";

import "./profilPage.css";
import profileDefault from "../../Images/doctors/doctors-1.jpg";
import { FaAnglesLeft } from "react-icons/fa6";

function ProfilPage() {
  const [userData, setUserData] = useState({
    name: "Dr. Jane Smith",
    eventKey: "Neurology",
    title: "Consultant Neurologist",
    degree: "MBBS, MD",
    description: "Specialist in neurological disorders and patient care.",
    gender: "Female",
    address: "456 Clinic Avenue, MedCity",
    phoneNumber: "077 1234567",
    fees: "300",
  });

  const [profilePhoto, setProfilePhoto] = useState(profileDefault);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Do you want to save the changes?");
    if (confirmed) {
      setIsEditing(false);
    }
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (


      <div className="app-container">
        <SideNav />
        <div className="content">
        <div className="profile-page">
        {/* Header */}
        <div className="profile-header-card">
            <div className="profile-header">
            <img className="profile-photo" src={profilePhoto} alt="Profile" />
            <div className="profile-info">
                <h2>Personalize Your Account</h2>
                <p>Your profile photo will appear on apps and devices that use your account.</p>
                <label className="upload-btn">
                Change Photo
                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                </label>
            </div>
            </div>
        </div>

        {/* Details */}
        <div className="profile-details-card">
            <h3>Profile Information</h3>

            {[
            { label: "Full Name", field: "name" },
            { label: "Department", field: "eventKey" },
            { label: "Title", field: "title" },
            { label: "Degree", field: "degree" },
            { label: "Description", field: "description", type: "textarea" },
            { label: "Gender", field: "gender", type: "select" },
            { label: "Address", field: "address", type: "textarea" },
            { label: "Phone Number", field: "phoneNumber" },
            { label: "Fees", field: "fees" },
            ].map(({ label, field, type }) => (
            <div className="profile-row" key={field}>
                <label className="field-label">{label}</label>
                {isEditing ? (
                type === "textarea" ? (
                    <textarea
                    className="editable-input"
                    value={userData[field]}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    required
                    />
                ) : type === "select" ? (
                    <select
                    className="editable-input"
                    value={userData[field]}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    </select>
                ) : (
                    <input
                    type="text"
                    className="editable-input"
                    value={userData[field]}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    required
                    />
                )
                ) : (
                <span className="field-value">
                    {field === "fees" ? `$ ${userData[field]}` : userData[field]}
                </span>
                )}
            </div>
            ))}

            {/* Buttons */}
            <div className="actionlinks">
            {!isEditing ? (
                <a href="#" className="link edit-link" onClick={handleEditToggle}>
                Edit
                </a>
            ) : (
                <a href="#" className="link save-link" onClick={handleSave}>
                Save
                </a>
            )}
            </div>
        </div>
        </div>
        </div>
      </div>

  );
}

export default ProfilPage;
