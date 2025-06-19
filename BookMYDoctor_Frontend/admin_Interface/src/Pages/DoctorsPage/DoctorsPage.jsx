import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './DoctorsPage.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import SideNav from '../../Components/SideNav/SideNav';
import PopupMessage from "../../Components/PopupMessage/popupMessage";

function DoctorsPage() {

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [activeCards, setActiveCards] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({ type: '', message: '' });

  useEffect(() => {
    axios.get("http://localhost:8080/api/doctors/getDoctor")
      .then(res => {
        const fetchedDoctors = res.data;
        setDoctors(fetchedDoctors);

        // Initialize activeCards state based on doctor.status
        const initialActiveState = {};
        fetchedDoctors.forEach(doctor => {
          initialActiveState[doctor.doctorId] = doctor.status === "Active";
        });
        setActiveCards(initialActiveState);

        // Extract unique departments
        const uniqueDepartments = [...new Set(fetchedDoctors.map(doc => doc.department))];
        setDepartments(uniqueDepartments);
      })
      .catch(err => {
        console.error("Failed to fetch doctors", err);
      });
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0 });
  }

  const handleDeleteDoctor = async (doctorId) => {

    // Always show a message when clicked
    setToast({ type: "", message: "hiddnne poup message ..." });

  const confirmed = window.confirm("Are you sure you want to delete this doctor profile?");
  if (!confirmed) return;

  try {
    await axios.delete(`http://localhost:8080/api/doctors/${doctorId}`);

    // Remove doctor from state so UI updates instantly
    setDoctors(prevDoctors => prevDoctors.filter(doc => doc.doctorId !== doctorId));

    // Also update activeCards state (remove the doctor entry)
    setActiveCards(prev => {
      const copy = { ...prev };
      delete copy[doctorId];
      return copy;
    });
     setToast({ type: "success", message: "Doctor profile deleted successfully." });
  } catch (error) {
    console.error("Failed to delete doctor profile", error);
    setToast({ type: "error", message: "Failed to delete doctor profile." });
  }
};



  const toggleCard = async (doctorId) => {
    const currentStatus = activeCards[doctorId];
    const newStatus = !currentStatus;

    const confirmUpdate = window.confirm(
      `Are you sure you want to set the doctor as ${newStatus ? "Active" : "Inactive"}?`
    );

    if (!confirmUpdate) return;

    try {
      // Find doctor and create updated object with new status
      const doctorToUpdate = doctors.find(doc => doc.doctorId === doctorId);
      if (!doctorToUpdate) throw new Error("Doctor not found");

      const updatedDoctor = {
        ...doctorToUpdate,
        status: newStatus ? "Active" : "Inactive"
      };

      // Send update to backend
      await axios.put(`http://localhost:8080/api/doctors/${doctorId}`, updatedDoctor);

      // Update activeCards state
      setActiveCards(prev => ({
        ...prev,
        [doctorId]: newStatus
      }));

      // Update doctors array state so it matches new status
      setDoctors(prevDoctors =>
        prevDoctors.map(doc =>
          doc.doctorId === doctorId ? updatedDoctor : doc
        )
      );

      alert(`Doctor status updated to ${newStatus ? "Active" : "Inactive"}`);
    } catch (err) {
      console.error("Failed to update doctor status", err);
      alert("Failed to update doctor status.");
    }
  };


  // Filter doctors based on search query (by name or title)
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
   <>
    <div className="app-container1">
      <SideNav />
      <div className="content1">
        <p className="dashboardDescription">
          Efficiently manage doctor profiles and their availability status (Active/Inactive) with ease.
        </p>

        {/* Search bar */}
        <div className="searchbar" controlId="searchDoctor">
          <input type="text" placeholder="Search by doctor name or title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>



        <Tabs defaultActiveKey="All_Department" id="fill-tab-example" fill>

          {/* get all doctor list  */}
          <Tab eventKey="All_Department" title="All Department">
            <Row xs={1} md={2} className="doctors-cards">
              {filteredDoctors.map((doctor) => (
                <Col key={doctor.doctorId}>
                  <Card className="doctors-cards1" style={{ position: 'relative' }}>
                    <Button className={`doctor-card-button ${activeCards[doctor.doctorId] ? 'success' : 'secondary'}`} onClick={() => toggleCard(doctor.doctorId)} > {activeCards[doctor.doctorId] ? '✓' : '✗'} </Button>
                    <Card.Img src={`http://localhost:8080/api/doctors/image/${doctor.doctorId}`} className="image" alt={doctor.fullName}/>
                    <Card.Body style={{ textAlign: "left" }}>
                      <h4 style={{ margin: 0, padding: 0, fontWeight: 800, color: "#2c4964", fontSize: "150%" }}> {doctor.fullName} </h4>
                      <p style={{ margin: 0, padding: 0, color: "#444444", fontWeight: 600 }}> {doctor.title}</p>
                      <hr style={{ width: "50px" }} />
                      <p style={{ color: "#444444" }}>{doctor.description}</p>
                      <div className='btnpart'>
                        <span><Link to={`/doctorprofile/${doctor.doctorId}`} className="view-button" onClick={handleClick}>View Details</Link></span>
                        <span> <Link className="delete-button" onClick={() => handleDeleteDoctor(doctor.doctorId)}> Delete Profile</Link></span>
                      </div>
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
              ))}
            </Row>
          </Tab>

         {/* filter the doctor wuith department */}
          {departments.map((department) => (
            <Tab key={department} eventKey={department} title={department}>
              <Row xs={1} md={2} className="doctors-cards">
                {filteredDoctors
                  .filter((doctor) => doctor.department === department)
                  .map((doctor) => (
                    <Col key={doctor.doctorId}>
                      <Card className="doctors-cards1" style={{ position: 'relative' }}>
                        <Button className={`doctor-card-button ${activeCards[doctor.doctorId] ? 'success' : 'secondary'}`}  onClick={() => toggleCard(doctor.doctorId)} >  {activeCards[doctor.doctorId] ? '✓' : '✗'} </Button>
                        <Card.Img src={`http://localhost:8080/api/doctors/image/${doctor.doctorId}`} className="image" alt={doctor.fullName} />
                        <Card.Body style={{ textAlign: "left" }}>
                          <h4 style={{ margin: 0, padding: 0, fontWeight: 800, color: "#2c4964" }}> {doctor.fullName} </h4>
                          <p style={{ margin: 0, padding: 0, color: "#444444", fontWeight: 600 }}>{doctor.title} </p>
                          <hr style={{ width: "50px" }} />
                          <p style={{ color: "#444444" }}>{doctor.description}</p>
                          <div className='btnpart'>
                           <span><Link to={`/doctorprofile/${doctor.doctorId}`} className="view-button" onClick={handleClick}>View Details</Link></span>
                           <span> <Link className="delete-button" onClick={() => handleDeleteDoctor(doctor.doctorId)}> Delete Profile</Link></span>
                          </div>
                        </Card.Body>
                      </Card>
                      <br />
                    </Col>
                  ))}
              </Row>
            </Tab>
          ))}

        </Tabs>
      </div>
    </div>
     {/* Toast Message */}
     <PopupMessage type={toast.type} message={toast.message} />
   </>
  );
}

export default DoctorsPage;
