package com.example.Doctor_Appointment_Booking_System_Backend.repository;

import com.example.Doctor_Appointment_Booking_System_Backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


import javax.transaction.Transactional;
import java.time.LocalDate;

public interface PatientRepository extends JpaRepository <Patient , Long> {

    boolean existsByEmail(String email);// Check if a patient with the given email exists
    boolean existsByUserName(String userName);// Check if a patient with the given username exists

    @Query(value="SELECT* FROM patient WHERE patient_id=?1 " ,nativeQuery = true)
    Patient getPatientById(long patientId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE patient SET full_name = ?2, address = ?3, gender = ?4, image = ?5, phone_number = ?6, dob = ?7 WHERE patient_id = ?1", nativeQuery = true)
    int updatePatientById(long patientId, String fullName, String address, String gender, String phoneNumber, String number, LocalDate dob);


}
