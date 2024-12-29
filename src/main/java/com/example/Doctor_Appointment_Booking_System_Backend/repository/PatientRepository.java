package com.example.Doctor_Appointment_Booking_System_Backend.repository;

import com.example.Doctor_Appointment_Booking_System_Backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository <Patient , Integer> {

    boolean existsByEmail(String email);// Check if a patient with the given email exists
    boolean existsByUserName(String userName);// Check if a patient with the given username exists
}
