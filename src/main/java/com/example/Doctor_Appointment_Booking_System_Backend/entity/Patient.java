package com.example.Doctor_Appointment_Booking_System_Backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Blob;
import java.time.LocalDate;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long patientId;

    @Lob
    private Blob image; // Changed from Byte to byte[] for storing images

    @Column(nullable = false) // Added a constraint to ensure fullName is not null
    private String fullName;

    @Column(nullable = false) // Added a constraint to ensure phoneNumber is not null
    private String phoneNumber;

    @Column(nullable = false) // Added a constraint to ensure address is not null
    private String address;

    @Enumerated(EnumType.STRING) // Enum values stored as strings in the database
    @Column(nullable = false) // Added a constraint to ensure gender is not null
    private Gender gender;

    @Column(nullable = false) // Added a constraint to ensure dob is not null
    private LocalDate dob;


    @Column(unique = true, nullable = false) // Email must be unique and not null
    private String email;


    @Column(nullable = false) // Password must not be null
    private String password;

    // Enum for Gender
    public enum Gender {
        Male, Female, Other
    }


}
