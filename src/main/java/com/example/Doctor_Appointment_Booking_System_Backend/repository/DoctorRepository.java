package com.example.Doctor_Appointment_Booking_System_Backend.repository;

import com.example.Doctor_Appointment_Booking_System_Backend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // Custom query to check if a doctor with the same details exists
    boolean existsByFullNameAndPhoneNumberAndDepartmentAndTitle(String fullName, String phoneNumber, String department, String title);
}
