<p align="center">
  <img src="https://github.com/user-attachments/assets/13a58a46-8a28-43f1-89b4-d8485b21dce0" alt="HELTHHUB Logo" width="180"/>
</p>

<h1 align="center">🏥 BookMyDoctor Appointment Management System</h1>

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

**BOOKMYDOCTOR MEDICAL CENTER** is a smart and scalable Appointment Management System designed and developed from scratch to digitize key hospital workflows. This full-stack solution provides a modern, role-based interface for **Admins** and **Patients**, and features an AI-powered **chatbot** to enhance the patient experience by helping them find doctor details, specialties, and booking guidance through real-time chat.

> Core features include appointment scheduling, chatbot-based interaction, SMS-based notifications using **Twilio**, role-based dashboards, secure user authentication with **bcrypt**, profile image handling, and administrative control over hospital staff.

---

## 🎯 Objectives

- Digitally streamline hospital appointments and communications
- Empower patients with self-service access to appointments and notifications
- Enable real-time doctor detail discovery using chatbot interface
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
- **Chat with an AI-based chatbot** to find doctor names, specialties, and available slots
- Receive SMS and in-app notifications for appointment status
- View own profile, notifications, and medical interaction history
- Upload and manage profile images using file handling

---

## ⚙️ Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Frontend     | React.js (role-based apps) + Chatbot UI |
| Backend      | Spring Boot (REST APIs)           |
| Database     | MySQL                             |
| Auth         | bcrypt password hashing           |
| Messaging    | Twilio (SMS integration)          |
| Chatbot      | React + JavaScript chatbot (custom logic) |
| File Handling| Multipart Image Uploads           |
| Tools Used   | Postman, IntelliJ, VSCode         |
| Java Version | JDK 1.8                           |
| Format       | JSON over HTTP                    |

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
      <img src="https://github.com/user-attachments/assets/19778891-420a-4c3c-adab-372a733c068b" alt="Patient Interface" style="width: 100%;" />
      <p>
        <a align="center" href="https://github.com/SatharakaNilmantha/DoctorAppointmentBookingSystem-Front-end-.git" target="_blank">
          <img src="https://img.shields.io/badge/GitHub-Project-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Project">
        </a>
      </p>
    </td>
    <td valign="top" style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/35aa620d-f13e-403d-8037-51670cf5729c" alt="Admin Interface" style="width: 100%;" />
      <p>
        <a align="center" href="https://github.com/SatharakaNilmantha/Doctor-Appointment-Admin-Interface-front-end-.git" target="_blank">
          <img src="https://img.shields.io/badge/GitHub-Project-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Project">
        </a>
      </p>
    </td>
  </tr>
</table>

<table style="width: 100%; table-layout: fixed;">
  <tr>
    <th style="width: 100%;">ChatBot Interface</th>
  </tr>
  <tr>
    <td valign="top" style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/bd92197b-32a7-446e-a6a9-94c547f47148" alt="Patient Interface" style="width: 100%;" />
    </td>
  </tr>
</table>

<table style="width: 100%; table-layout: fixed;">
  <tr>
    <th style="width: 100%; text-align: center;">SMS Screenshots</th>
  </tr>
  <tr>
    <td valign="top" style="text-align: center; vertical-align: top;">
      <div style="display: flex; justify-content: center; align-items: flex-start; gap: 10px;">
        <img src="https://github.com/user-attachments/assets/8818c23e-e9a0-4554-b31a-36a1b8811763" alt="SMS Interface 1" style="width: 45%;" />
        <img src="https://github.com/user-attachments/assets/3d38042f-8571-44e9-9d6e-9a3dbdf1f3a0" alt="SMS Interface 2" style="width: 45%;" />
      </div>
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
npm run dev
```

> Replace `ROLE_Interface` with one of:
> * admin_Interface
> * patient_Interface


---

## 📘 Project Background

🛠️ **BookMyDoctor** is a full-stack appointment management system personally designed and developed by **Satharaka Nilmantha**.  
It reflects real-world challenges in hospital operations and provides a smart digital solution built with modern technologies.

🚀 The project showcases:
- 🔐 Secure authentication using **bcrypt**
- 📱 SMS communication with **Twilio**
- 🧑‍⚕️ Role-based portals for **Admins** and **Patients**
- 💬 Chatbot integration for quick access to doctor details 
- 🖼️ File handling and profile image uploads
- 🔧 RESTful backend using **Java Spring Boot**
- 💻 Responsive UI built with **React.js**
- 🗃️ MySQL database integration
- 📦 API testing using **Postman**

📚 This system is **not** part of any academic coursework – it's an **independent project** built out of passion for healthcare tech and full-stack development.



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

## 🙏 Acknowledgements

🌟 This project was built from the ground up with 💡 **self-initiative, passion, and dedication**.  
Every line of code was written, tested, and refined by **Satharaka Nilmantha** — with no external assistance.

💻 Countless hours were spent designing architecture, building the backend, crafting the UI, integrating APIs, and fine-tuning performance.

🧠 Special thanks to:
- Open-source communities for libraries, documentation, and tools
- GitHub for providing a collaborative and open platform
- My curiosity and love for technology ❤️

> *"Built with heart, mind, and code — to make hospital appointments smarter and simpler."*

> **💡 Like this project? Give it a ⭐ on GitHub and share it with others! 😊**


