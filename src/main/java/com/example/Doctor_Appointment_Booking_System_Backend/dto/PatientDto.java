package com.example.Doctor_Appointment_Booking_System_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDto {

    private long patientId;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String gender; // Use String to simplify gender representation in the DTO
    private LocalDate dob;
    private int age;
    private String email;
    private String password;
    private String currentPassword;
    private byte[] image; // Include image if necessary for the front-end
}
