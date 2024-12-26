import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

import './DoctorProfilePage.css'

import doctor from "../../Images/doctors/doctors-1.jpg";  // Check if this is correct

import { FaAnglesLeft } from "react-icons/fa6";

function DoctorProfilePage() {

    // State to hold user profile data
    const [userData, setUserData] = useState({
        name: "Walter White",  
        eventKey: "Dental",
        title: "Chief Medical Officer",  
        degree:"MBBS",
        description:"Qui laudantium consequatur laborum sit qui ad sapiente dila parde ",
        gender: "Male", 
        address:"No 120/A,Galgedara,Kandy",
        phoneNumber:"076 5817905",
        fees: "200",  
    });

    // State to hold the user's profile photo URL
    const [profilePhoto, setProfilePhoto] = useState(
        doctor  // Default placeholder image
    );

    // State to control the editing mode (true = editing, false = view-only)
    const [isEditing, setIsEditing] = useState(false);

    // Function to handle changes to user data (name, dob, etc.)
    const handleFieldChange = (field, value) => {
        setUserData((prevData) => ({ ...prevData, [field]: value }));
    };

    // Toggle between edit and view mode
    const handleEditToggle = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);  // Toggle the editing state
    };

    // Function to save the changes and confirm with the user
    const handleSave = (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Do you want to save the changes?");
        if (confirmed) {
            setIsEditing(false);  // Exit editing mode after saving
        }
    };

    // Function to handle the photo upload (changes the profile photo)
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];  // Get the uploaded file
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePhoto(e.target.result);  // Set the new profile photo
            };
            reader.readAsDataURL(file);  // Read the file as a data URL
        }
    };

//---------------------------------------------handle back link using navigate hook---------------------------------//

const navigate = useNavigate(); // Initialize the navigate function

const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page in the history stack
};


    return (
        <>


            <div className="profile-page">
                {/* Profile Header Card */}
                <div className=" profile-header-card">
                    <div className="profile-header">

                        <img className="profile-photo" src={profilePhoto} alt="Profile" /> 

                        <div className="profile-info">
                            <h2>Personalize Your Account</h2>
                            <p>Your profile photo will appear on apps and devices that use your account.</p>

                            <label className="upload-btn"> Change Photo
                                {/* Hidden file input to upload new photo */}
                                <input type="file" accept="image/*" onChange={handlePhotoUpload}  style={{ display: "none" }}  />
                            </label>

                        </div>

                    </div>
                </div>

                {/* Profile Details Card */}
                <div className=" profile-details-card">
                    <h3>Profile Information</h3>

                    {/* Name Row */}
                    <div className="profile-row">
                        <label className="field-label">Full Name</label>
                        {isEditing ? (
                            <input type="text" className="editable-input" value={userData.name} onChange={(e) => handleFieldChange("name", e.target.value)} required/>
                        ) : (
                            <span className="field-value">{userData.name}</span>
                        )}
                    </div>

                    {/* Event Key Row */}
                    <div className="profile-row">
                        <label className="field-label">Event Key</label>
                        {isEditing ? (
                            <input type="text" className="editable-input" value={userData.eventKey} onChange={(e) => handleFieldChange("eventKey", e.target.value)} required/>
                        ) : (
                            <span className="field-value">{userData.eventKey}</span>
                        )}
                    </div>

                    {/* Title Row */}
                    <div className="profile-row">
                        <label className="field-label">Title</label>
                        {isEditing ? (
                            <input type="text" className="editable-input" value={userData.title} onChange={(e) => handleFieldChange("title", e.target.value)} required/>
                        ) : (
                            <span className="field-value">{userData.title}</span>
                        )}
                    </div>

                    {/* Degree Row */}
                    <div className="profile-row">
                        <label className="field-label">Degree</label>
                        {isEditing ? (
                            <input type="text" className="editable-input" value={userData.degree} onChange={(e) => handleFieldChange("degree", e.target.value)} required/>
                        ) : (
                            <span className="field-value">{userData.degree}</span>
                        )}
                    </div>

                     {/* Description Row */}
                    <div className="profile-row">
                        <label className="field-label">Description</label>
                        {isEditing ? (
                            <textarea className="editable-input" value={userData.description} onChange={(e) => handleFieldChange("description", e.target.value)} required></textarea>
                        ) : (
                            <span className="field-value">{userData.description}</span> 
                        )}
                    </div>

                    {/* Gender Row */}
                    <div className="profile-row">
                        <label className="field-label">Gender</label>
                        {isEditing ? (
                            <select className="editable-input" value={userData.gender} onChange={(e) => handleFieldChange("gender", e.target.value)}>
                                <option value="Male">Male</option> 
                                <option value="Female">Female</option>  
                                <option value="Other">Other</option>  
                            </select>
                        ) : (
                            <span className="field-value">{userData.gender}</span> 
                        )}
                    </div>

                    {/* Address Row */}
                    <div className="profile-row">
                        <label className="field-label">Address</label>
                        {isEditing ? (
                            <textarea  className="editable-input" value={userData.address} onChange={(e) => handleFieldChange("address", e.target.value)} required/>
                        ) : (
                            <span className="field-value">{userData.address}</span>
                        )}
                    </div>

                    {/* Phone Number Row */}
                    <div className="profile-row">
                        <label className="field-label">Phone Number</label>
                        {isEditing ? (
                            <input type="text" className="editable-input" value={userData.phoneNumber} onChange={(e) => handleFieldChange("phoneNumber", e.target.value)} required/>
                        ) : (
                            <span className="field-value">{userData.phoneNumber}</span>
                        )}
                    </div>

                    {/* Fees Row */}
                    <div className="profile-row">
                        <label className="field-label">Fees</label>
                        {isEditing ? (
                            <input type="text" className="editable-input" value={userData.fees} onChange={(e) => handleFieldChange("fees", e.target.value)} required/>
                        ) : (
                            <span className="field-value">$ {userData.fees}</span>
                        )}
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
        </>
    );
}

export default DoctorProfilePage;
