import React, { useState, useEffect } from 'react';
import SideNav from '../../Components/SideNav/SideNav.jsx';
import './RegisteredPatientPage.css';
import { Modal, Button, Row, Col, Badge, Card, CardHeader } from 'react-bootstrap';
import { 

  FaUser, 
 
  FaVenusMars, 
 
  FaAddressBook, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  
 
} from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { BsCalendarDate, BsGenderAmbiguous } from 'react-icons/bs';

function RegisteredPatientPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/patient/getPatient');
      const data = await response.json();
      setPatients(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setLoading(false);
    }
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };


  const filteredPatients = patients.filter(patient => {
    const searchLower = searchQuery.toLowerCase();
    return (
      patient.fullName?.toLowerCase().includes(searchLower) ||
      patient.gender?.toLowerCase().includes(searchLower) ||
      patient.phoneNumber?.includes(searchQuery) ||
      patient.email?.toLowerCase().includes(searchLower)
    );
  });

  // Function to format phone numbers to start with +94
  const formatPhoneNumber = (number) => {
  // Remove any non-digit characters
  const digits = number.replace(/\D/g, '');

  // If already starts with '94', add '+'
  if (digits.startsWith('94')) {
    return `+${digits}`;
  }

  // If starts with '0', replace with '+94'
  if (digits.startsWith('0')) {
    return `+94${digits.substring(1)}`;
  }

  // Default fallback
  return `+94${digits}`;
};


  return (
    <div className="app-container">
      <SideNav />
      <div className="content">
        <h1 className="dashboard-title">Doctor Appointment System</h1>
        <p className="dashboard-subtitle">
          Displaying all registered patients.
        </p>

        <div className="search-container">
          <div className="search-bar">
            <input  type="text"  className="input"  placeholder="Search by any detail (Name, Gender, Phone, Email)"  value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)}  style={{ flex: 1 }}  />
          </div>

          <div className="patient-counts">
            <div className='totalCount'><h3>Total Patient: {filteredPatients.length}</h3></div>
          </div>
        </div>

        <div className="action-table">
          <h3>Registered Patients</h3>
          {loading ? (
            <p>Loading patients...</p>
          ) : (
            <table>
              <thead className="table-header">
                <tr>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr key={patient.patientId}>
                      <td>
                        <p className='table-row'> <img className='table-image' src={`http://localhost:8080/api/patient/image/${patient.patientId}`}  alt="Patient" /> {patient.fullName || "N/A"}  </p>
                      </td>
                      <td>
                        <p > {patient.gender || "N/A"} </p>
                      </td>
                      <td>
                        <p>{patient.phoneNumber ? formatPhoneNumber(patient.phoneNumber) : "N/A"}</p>
                      </td>
                      <td>
                        <p style={{textAlign: "left" , paddingLeft: "30px"}} > {patient.email || "N/A"}  </p>
                      </td>
                      <td>
                        <button className="view-btn" onClick={() => handleView(patient)}>View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No matching patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Patient Details Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton className="border-0 pb-0 modal-header">
            <Modal.Title className="w-100">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="m-0"> Registered Patient Details </h4>
              </div>
            </Modal.Title>
          </Modal.Header>
           <hr />
          <Modal.Body className="pt-0">
            {selectedPatient ? (
              <div className="patient-profile">
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <img   className="rounded-circle border border-3 border-primary"  src={`http://localhost:8080/api/patient/image/${selectedPatient.patientId}`}  alt="Patient"  width="120"  height="120"  style={{ objectFit: 'cover' }}  />
                    <Badge bg="primary" className="position-absolute bottom-0 end-0 rounded-circle p-2 border border-2 border-white">
                      <FaUser size={14} />
                    </Badge>
                  </div>
                  <h4 className="my-2">{selectedPatient.fullName}</h4>
                  <Badge bg="light" text="primary" className="fw-normal">
                    Patient ID: {selectedPatient.patientId}
                  </Badge>
                </div>

                <Row>
                  <Col md={6}>
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="info-header">
                        <h5 className="d-flex align-items-center my-1 "> <BsGenderAmbiguous className="me-3 " />Personal Information</h5>
                      </CardHeader>
                      <Card.Body>
                        <div className="mb-3">
                          <small className="text-muted d-block">Gender</small>
                          <div className="d-flex align-items-center mt-1">
                            <FaVenusMars className="text-primary me-2" />
                            <span>{selectedPatient.gender || "Not specified"}</span>
                          </div>
                        </div>
                        <div>
                          <small className="text-muted d-block">Date of Birth</small>
                          <div className="d-flex align-items-center mt-1">
                            <BsCalendarDate className="text-primary me-2" />
                            <span>
                              {selectedPatient.dob ? new Date(selectedPatient.dob).toLocaleDateString() : "Not specified"}
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="border-0 shadow-sm">
                      <CardHeader className='contact-header '>     
                         <h5 className="d-flex align-items-center my-1 "> <FaAddressBook className="me-3" />  Contact Information</h5></CardHeader>
                      <Card.Body>
                        <div className="mb-3">
                          <small className="text-muted d-block">Phone Number</small>
                          <div className="d-flex align-items-center mt-1">
                            <FaPhone className="text-primary me-2" />
                            <span>{selectedPatient.phoneNumber   ? formatPhoneNumber(selectedPatient.phoneNumber)   : "Not provided"}</span>

                          </div>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted d-block">Email Address</small>
                          <div className="d-flex align-items-center mt-1">
                            <FaEnvelope className="text-primary me-2" />
                            <span>{selectedPatient.email || "Not provided"}</span>
                          </div>
                        </div>
                        <div>
                          <small className="text-muted d-block">Address</small>
                          <div className="d-flex align-items-center mt-1">
                            <FaMapMarkerAlt className="text-primary me-2" />
                            <span>{selectedPatient.address || "Not provided"}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
}

export default RegisteredPatientPage;