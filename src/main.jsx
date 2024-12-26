import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './index.css'

import App from './App.jsx'
import Appointment from './Pages/AppointmentPage/AppointmentPage.jsx';
import Doctors from './Pages/DoctorsPage/DoctorsPage.jsx';
import DoctorProfile from './Pages/DoctorProfilePage/DoctorProfilePage.jsx';
import AddDoctor from './Pages/AddDoctorPage/AddDoctorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><App/></div>,
  },
  {
    path: "/appointment",
    element: <div><Appointment/></div>,
  },
  {
    path: "/doctors",
    element: <div><Doctors/></div>,
  },
  {
    path: "/doctorprofile",
    element: <div><DoctorProfile/></div>,
  },
  {
    path: "/adddoctor",
    element: <div><AddDoctor/></div>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
