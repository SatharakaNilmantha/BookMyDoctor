package com.example.Doctor_Appointment_Booking_System_Backend.repository;


import com.example.Doctor_Appointment_Booking_System_Backend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository <Doctor ,Long>{

}
