import React from 'react'
import { Link } from "react-router-dom";
import './DoctorsPage.css'




import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import doctor1 from "../../images/doctors/doctors-1.jpg";
import doctor2 from "../../images/doctors/doctors-2.jpg";
import doctor3 from "../../images/doctors/doctors-3.jpg";
import doctor4 from "../../images/doctors/doctors-4.jpg";
import doctor5 from "../../images/doctors/doctors-5.jpg";
import doctor6 from "../../images/doctors/doctors-6.jpg";
import SideNav from '../../Components/SideNav/SideNav';

function DoctorsPage() {
 
    const Doctors = [
        {
          eventKey: "Dental",
          Name: "Walter White",
          title: "Chief Medical Officer",
          description: "Qui laudantium consequatur laborum sit qui ad sapiente dila parde ",
          imgSrc:doctor1
        },
        {
          eventKey: "Cardialogy",
          Name:"Sarah Jhonson",
          title: "Cardialogy",
          description: "Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. ",
          imgSrc: doctor2
        },
        {
          eventKey: "Neurology",
          Name:"William Anderson",
          title :"Neurology" ,
          description: "Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt.",
          imgSrc: doctor3
        },
        {
          eventKey: "Pediatrics",
          Name:"Amanda Jepson",
          title: "Pediatrics",
          description: "Description for Pediatrics goes here  Odio similique illum id quidem non enim fuga",
          imgSrc: doctor4
        },
        {
          eventKey:  "Neurology" ,  
          Name:"HarissonThomasn",
          title: "Neurology" ,
          description: "Description for Eye Care goes here  Odio similique illum id quidem non enim fuga",
          imgSrc: doctor5
        },

        {
            eventKey:  "Pediatrics",  
            Name:"HarissonThomas",
            title:  "Pediatrics",
            description: "Description for Eye Care goes here  Odio similique illum id quidem non enim fuga",
            imgSrc: doctor6
          },

        ];

        function handleClick() {
          window.scrollTo({
            top: 0, // Scroll to the top
          });
        }

  return (
    <>
       <div className="app-container1">
         <SideNav/>
        <div className="content1">
         <div>
          <h1 className="dashboard-title">Welcome to Doctor Appointment System</h1>
          <p className="dashboard-description">
            Manage your appointments, doctors, and patients seamlessly.
          </p>

            {/*--------------------------------------card section -------------------------------------------------*/ }
         <div >
            <Tabs defaultActiveKey="All_Department" id="fill-tab-example"  fill>
            <Tab eventKey="All_Department" title="All Department">
                <Row xs={1} md={2} className="cards1 ">
                {Doctors.map((doctor) => (
                    <Col key={doctor.Name} >
                    <Card className="card1">
                        <Card.Img src={doctor.imgSrc} className="image" />
                        <Card.Body style={{ textAlign: "left" }}>
                        <h4 style={{ margin: "0px",padding:"0px" ,fontWeight: 800 ,color: "#2c4964" }}>{doctor.Name}</h4>
                        <p style={{ margin: "0px" ,padding:"0px",color: "#444444",fontWeight: 600 }}>{doctor.title}</p>
                        <hr style={{ width:"50px"}} /> 
                        <p style={{color: "#444444" }}>{doctor.description}</p>
                        <div className='iconpart'>
                            <span><Link to="/doctorprofile" className="book-button1" onClick={handleClick}>View Details</Link></span>
                        </div>
                        </Card.Body>
                    </Card>
                    <br />
                    </Col>
                ))}
                </Row>
            </Tab>

            {["Dental", "Cardialogy", "Neurology", "Pediatrics"].map((department) => (
            <Tab key={department} eventKey={department} title={department}>
                <Row xs={1} md={2} className="cards1">
                    {Doctors.filter((doctor) => doctor.eventKey === department).map((doctor) => (
                    <Col key={doctor.Name}>
                        <Card className="card1">
                        <Card.Img src={doctor.imgSrc} className="image" />
                        <Card.Body style={{ textAlign: "left" }}>
                        <h4 style={{ margin: "0px",padding:"0px" ,fontWeight: 800 ,color: "#2c4964" }}>{doctor.Name}</h4>
                        <p style={{ margin: "0px" ,padding:"0px",color: "#444444",fontWeight: 600  }}>{doctor.title}</p>
                        <hr style={{ width:"50px"}} /> 
                        <p style={{color: "#444444" }}>{doctor.description}</p>

                        <div className='iconpart'>
                            <span><Link to="/doctorprofile" className="book-button1">View Details</Link></span>
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
        </div>
      </div>
    </>
  )
}

export default DoctorsPage