import React, { useState } from 'react';
import './AddDoctorPage.css';
import SideNav from '../../Components/SideNav/SideNav';

function AddDoctorPage() {

    const [photo, setPhoto] = useState(null); // State to handle photo upload

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file)); // Create a preview of the uploaded photo
        }
    };

  return (
    <>
      <div className="app-container1">
        <SideNav />
        <div className="content1">
            <form method="post" action="/submit-profile"className="profile-page1">
                {/* Profile Header Card */}
                <div className="profile-header-card">
                <div className="profile-header">

                    {/* Display uploaded photo */}
                    {photo ? (
                        <img className="profile-photo" src={photo} alt="Profile" />
                        ) : (
                        <img className="profile-photo" src="https://via.placeholder.com/100" alt="Profile Placeholder"  />
                        )}
                    <div className="profile-info">
                    <h2>Personalize Your Account</h2>
                    <p>Your profile photo will appear on apps and devices that use your account.</p>
                    <label className="upload-btn"> Add Photo
                        <input type="file" id="photo" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                    </label>
                    </div>
                </div>
                </div>

                {/* Profile Details Card */}
                <div className="profile-details-card">
                <h3>Profile Information</h3>

                {/* Name Row */}
                <div className="profile-row">
                    <label className="field-label">Full Name</label>
                    <input type="text" name="fullName" className="editable-input" placeholder='Enter the Full Name' required
                    />
                </div>

                {/* Department Row */}
                <div className="profile-row">
                    <label className="field-label">Department</label>
                    <input type="text" name="department" className="editable-input" placeholder='Enter the Department' required
                    />
                </div>

                {/* Title Row */}
                <div className="profile-row">
                    <label className="field-label">Title</label>
                    <input type="text"name="title"className="editable-input" placeholder='Enter the Title' required/>
                </div>

                {/* Degree Row */}
                <div className="profile-row">
                    <label className="field-label">Degree</label>
                    <input type="text" name="degree" className="editable-input" placeholder='Enter the Degree ' required/>
                </div>

                {/* Description Row */}
                <div className="profile-row">
                    <label className="field-label">Description</label>
                    <textarea name="description" className="editable-input" placeholder='Enter the Driscription' required/>
                </div>

                {/* Gender Row */}
                <div className="profile-row">
                    <label className="field-label">Gender</label>
                    <select name="gender" className="editable-input">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    </select>
                </div>

                {/* Address Row */}
                <div className="profile-row">
                    <label className="field-label">Address</label>
                    <textarea name="address" className="editable-input" placeholder='Enter the Address'required />
                </div>

                {/* Phone Number Row */}
                <div className="profile-row">
                    <label className="field-label">Phone Number</label>
                    <input type="text" name="phoneNumber" className="editable-input" placeholder='Enter the Mobile Number' required/>
                </div>

                {/* Fees Row */}
                <div className="profile-row">
                    <label className="field-label">Fees</label>
                    <input type="text" name="fees" className="editable-input" placeholder='Enter the fees' required />
                </div>

                {/* Save Button */}
                <div className="submit">
                    <button className="submitlink" type="submit" >Save</button>
                </div>
                </div>
            </form>
        </div>
      </div>
    </>
  );
}

export default AddDoctorPage;
