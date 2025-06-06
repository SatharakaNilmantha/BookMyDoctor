package com.example.Doctor_Appointment_Booking_System_Backend.repository;

import com.example.Doctor_Appointment_Booking_System_Backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment ,Long> {
}
