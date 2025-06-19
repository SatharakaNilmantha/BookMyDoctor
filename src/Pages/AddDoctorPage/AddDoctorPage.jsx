import React, { useState } from 'react';
import './AddDoctorPage.css';
import SideNav from '../../Components/SideNav/SideNav';
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx';


function AddDoctorPage() {
  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [shiftStartTime, setShiftStartTime] = useState("");
  const [shiftEndTime, setShiftEndTime] = useState("");
  const [weekendStartTime, setWeekendStartTime] = useState("");
  const [weekendEndTime, setWeekendEndTime] = useState("");
  const [toast, setToast] = useState({ type: '', message: '' });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

  const toFullTime = (hhmm) => {
    return hhmm ? `${hhmm}:00` : "";
  };

  const addThreeHours = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setHours(date.getHours() + 6);
    return date.toTimeString().slice(0, 5); // HH:mm
  };

  const handleWeekdayStartChange = (e) => {
    const startTime = e.target.value;
    setShiftStartTime(startTime);
    setShiftEndTime(addThreeHours(startTime));
  };

  const handleWeekendStartChange = (e) => {
    const startTime = e.target.value;
    setWeekendStartTime(startTime);
    setWeekendEndTime(addThreeHours(startTime));
  };

  const validateSriLankanPhone = (number) => {
    const regex = /^0[7][0-9]{8}$/;
    return regex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Always show a message when clicked
    setToast({ type: "info", message: "Saving doctor details..." });

    const form = e.target;
    const phone = form.phoneNumber.value.trim();
    const fees = form.fees.value.trim();

    if (!photoFile) {
      setToast({ type: "error", message: "Please upload a profile photo for the doctor." });
      return;
    }

    if (!validateSriLankanPhone(phone)) {
      setToast({ type: "error", message: "Please enter a valid Sri Lankan phone number (e.g., 07XXXXXXXX)." });
      return;
    }

    if (isNaN(fees) || Number(fees) <= 0) {
      setToast({ type: "error", message: "Fees must be a valid number greater than 0." });
      return;
    }

    const confirmed = window.confirm("Are you sure you want to save this doctor?");
    if (!confirmed) return;

    const doctor = {
      fullName: form.fullName.value,
      department: form.department.value,
      title: form.title.value,
      degree: form.degree.value,
      description: form.description.value,
      gender: form.gender.value,
      address: form.address.value,
      phoneNumber: phone,
      fees: fees,
      shiftStartTime: toFullTime(shiftStartTime),
      shiftEndTime: toFullTime(shiftEndTime),
      weekendStartTime: toFullTime(weekendStartTime),
      weekendEndTime: toFullTime(weekendEndTime),
      status: "Active"
    };

    const formData = new FormData();
    formData.append("doctor", JSON.stringify(doctor));
    formData.append("image", photoFile);

    try {
      const response = await fetch("http://localhost:8080/api/doctors/saveDoctor", {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();

      if (response.ok) {
        setToast({ type: "success", message: responseText || "Doctor saved successfully!" });
        form.reset();
        setPhoto(null);
        setPhotoFile(null);
        setShiftStartTime("");
        setShiftEndTime("");
        setWeekendStartTime("");
        setWeekendEndTime("");
      } else {
        setToast({ type: "error", message: responseText || "Something went wrong!" });
      }
    } catch (err) {
      setToast({ type: "error", message: "Server error: " + err.message });
    }
  };




  return (
    <div className="app-container1">
      <SideNav />
      <div className="content1">
        <form className="profile-page1" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="profile-header-card">
            <div className="profile-header">
              <img className="profile-photo" src={photo} alt=""/>
              <div className="profile-info">
                <h2>Personalize Your Account</h2>
                <p>Your profile photo will appear on apps and devices that use your account.</p>
                <label className="upload-btn">
                  Add Photo
                  <input type="file" name="photo" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>

          <div className="profile-details-card">
            <h3>Profile Information</h3>

            <div className="profile-row">
              <label className="field-label">Full Name</label>
              <input type="text" name="fullName" className="editable-input" required />
            </div>

            <div className="profile-row">
              <label className="field-label" htmlFor="department">Department</label>
              <select name="department" id="department" className="editable-input" required>
                <option value="" disabled selected>Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Hepatology">Hepatology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Ophthalmology">Ophthalmology</option>
              </select>
            </div>

            <div className="profile-row">
              <label className="field-label">Title</label>
              <input type="text" name="title" className="editable-input" required />
            </div>

            <div className="profile-row">
              <label className="field-label">Degree</label>
              <input type="text" name="degree" className="editable-input" required />
            </div>

            <div className="profile-row">
            <label className="field-label">Description</label>
            <textarea  name="description" className="editable-input" required maxLength={100} placeholder="Max 100 characters"/>
            </div>



            <div className="profile-row">
            <label className="field-label">Gender</label>
            <select name="gender" className="editable-input" required>
                <option value="" disabled selected>Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            </div>

            <div className="profile-row">
              <label className="field-label">Address</label>
              <textarea name="address" className="editable-input" required />
            </div>

            <div className="profile-row">
              <label className="field-label">Phone Number</label>
              <input type="text" name="phoneNumber" className="editable-input" required />
            </div>

            <div className="profile-row">
              <label className="field-label">Fees</label>
              <input type="number" name="fees" className="editable-input" required min="1" />
            </div>

            {/* Weekday Shift */}
            <div className="profile-row">
              <div style={{ flex: 1, marginRight: '10px' }}>
                <label className="field-label">Weekday Shift Start</label>
                <input type="time" name="shiftStartTime" className="editable-input" value={shiftStartTime} onChange={handleWeekdayStartChange} required />
              </div>
              <div style={{ flex: 1 }}>
                <label className="field-label">Weekday Shift End</label>
                <input type="time" name="shiftEndTime" className="editable-input" value={shiftEndTime} readOnly required />
              </div>
            </div>

            {/* Weekend Shift */}
            <div className="profile-row">
              <div style={{ flex: 1, marginRight: '10px' }}>
                <label className="field-label">Weekend Shift Start</label>
                <input type="time" name="weekendStartTime" className="editable-input" value={weekendStartTime} onChange={handleWeekendStartChange} required />
              </div>
              <div style={{ flex: 1 }}>
                <label className="field-label">Weekend Shift End</label>
                <input type="time" name="weekendEndTime" className="editable-input" value={weekendEndTime} readOnly required />
              </div>
            </div>

            <div className="submit">
              <button className="submitlink" type="submit">Save</button>
            </div>
          </div>
        </form>

        {/* Toast Message */}
        <PopupMessage type={toast.type} message={toast.message} />
      </div>
    </div>
  );
}

export default AddDoctorPage;
