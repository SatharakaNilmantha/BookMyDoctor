<p align="center">
  <img src="https://github.com/user-attachments/assets/13a58a46-8a28-43f1-89b4-d8485b21dce0" alt="HELTHHUB Logo" width="180"/>
</p>

<h1 align="center">🏥 BookMyDoctor</h1>

<p align="center">
  <strong>A Full-Stack Smart Appointment Management System</strong><br/>
  Digitizing hospital operations for Admins and Patients.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SpringBoot-2.7-green?style=flat-square&logo=springboot" />
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql" />
  <img src="https://img.shields.io/badge/Java-1.8-red?style=flat-square&logo=java" />
  <img src="https://img.shields.io/badge/License-Academic-blueviolet?style=flat-square" />
</p>

---

## 🌟 Overview

**BOOKMYDOCTOR MEDICAL CENTER** is a smart and scalable Appointment Management System  designed and developed from scratch to digitize key hospital workflows. This full-stack solution provides a modern, role-based interface for **Admins** and **Patients**.

> Core features include appointment scheduling, SMS-based notifications using **Twilio**, role-based dashboards, secure user authentication with **bcrypt**, profile image handling, and administrative control over hospital staff.

---

## 🎯 Objectives

- Digitally streamline hospital appointments and communications
- Empower patients with self-service access to appointments and notifications
- Give admins full control over appointments, staff status, and system configuration
- Use modern tools and best practices in full-stack development

---

## 🚀 Key Features

### 🧑‍💼 Admin Panel
- Accept / Reject patient appointments
- Send real-time **SMS & notifications via Twilio**
- Activate / Deactivate doctor accounts
- Manage patient and doctor profiles
- Upload and manage profile images using file handling
- View system logs and statistics
- Secure password storage using **bcrypt**

### 👩‍⚕️ Patient Portal
- Register and login with secure credentials
- Book and manage appointments
- Receive SMS and in-app notifications for appointment status
- View own profile, notifications, and medical interaction history

---

## ⚙️ Tech Stack

| Layer        | Technology               |
|--------------|--------------------------|
| Frontend     | React.js (role-based apps) |
| Backend      | Spring Boot (REST APIs)  |
| Database     | MySQL                    |
| Auth         | bcrypt password hashing  |
| Messaging    | Twilio (SMS integration) |
| File Handling| Multipart Image Uploads  |
| Tools Used   | Postman, IntelliJ, VSCode |
| Java Version | JDK 1.8                  |
| Format       | JSON over HTTP           |

---

## 🗂️ Project Structure



```

BookMyDoctor/
├── BookMyDoctor_Backend/         # Spring Boot backend
├── BookMYDoctor_Frontend/
│   ├── admin_Interface/              # Admin role React app
│   └── patient_Interface/            # Patient role React app
└── README.md

````



---

## 🖼️ Screenshots

<table style="width: 100%; table-layout: fixed;">
  <tr>
    <th style="width: 50%;">Patient Interface</th>
    <th style="width: 50%;">Admin Interface</th>
  </tr>
  <tr>
    <td valign="top" style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/6fc06deb-aed0-40de-82d7-62d441cfcc3d" alt="Patient Interface" style="width: 100%;" />
      <p>
        <a href="https://github.com/SatharakaNilmantha/DoctorAppointmentBookingSystem-Front-end-.git" target="_blank">
          <img src="https://img.shields.io/badge/GitHub-Project-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Project">
        </a>
      </p>
    </td>
    <td valign="top" style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/35aa620d-f13e-403d-8037-51670cf5729c" alt="Admin Interface" style="width: 100%;" />
      <p>
        <a href="https://github.com/SatharakaNilmantha/Doctor-Appointment-Admin-Interface-front-end-.git" target="_blank">
          <img src="https://img.shields.io/badge/GitHub-Project-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Project">
        </a>
      </p>
    </td>
  </tr>
</table>


---

## 🚀 Installation

Follow these steps to install and set up the project:

### 1️⃣ Clone the repository
   ```bash
   git clone https://github.com/SatharakaNilmantha/BookMyDoctor.git
   cd BookMyDoctor
   ```

### 2️⃣ Backend (Spring Boot)
```bash
cd BookMyDoctor_Backend
# Open in your IDE (IntelliJ/Eclipse) and run the Spring Boot application
````

### 3️⃣ Frontend (React Apps)

Repeat for each interface:

```bash
cd BookMYDoctor_Frontend/ROLE_Interface
npm install
npm start
```

> Replace `ROLE_Interface` with one of:
> * admin_Interface
> * patient_Interface

---
<h2 style="text-align: center;">📚 Roles & Contributors</h2>


---

## 📘 Project Background

> This is a **personal full-stack project** developed independently by **Satharaka Nilmantha**, showcasing real-world system design and development in the healthcare domain.  
> It demonstrates hands-on expertise in **Java Spring Boot**, **React.js**, **MySQL**, **Twilio**, **Postman**, **file handling**, and **bcrypt** authentication—integrated into a secure and scalable Smart Hospital Management System.


---

## 🤝 Contributing

We welcome academic collaboration. To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

---

## 📧 Contact

<p align="left">
  <a href="mailto:satharakanilmantha1@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
  </a>
  <a href="https://www.linkedin.com/in/your-linkedin-profile">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/SatharakaNilmantha">
    <img src="https://img.shields.io/badge/GitHub-Project-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Project">
  </a>
</p>

**Satharaka Nilmantha**  
📫 Reach me at: satharakanilmantha1@gmail.com  
🔗 Connect on [LinkedIn](https://www.linkedin.com/in/satharaka-nilmantha-aa7b96297/)

---

## 🔐 License

This project is licensed for **educational and academic purposes only**. Unauthorized commercial use is strictly prohibited.

---

>*Built with ❤️ for a better and smarter healthcare system.*
>***💡 If you like this project, don't forget to give it a ⭐ on GitHub! 😊***


