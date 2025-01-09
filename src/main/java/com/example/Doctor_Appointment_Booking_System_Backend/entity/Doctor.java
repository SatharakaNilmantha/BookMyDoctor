package com.example.Doctor_Appointment_Booking_System_Backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long DoctorId;

    @Lob
    private byte[] image; // Changed from Byte to byte[] for storing images

    @Column(nullable = false) // Added a constraint to ensure fullName is not null
    private String fullName;

    @Column(nullable = false) // Added a constraint to ensure phoneNumber is not null
    private String phoneNumber;

    @Column(nullable = false) // Added a constraint to ensure address is not null
    private String address;

    @Column(nullable = false) // Added a constraint to ensure address is not null
    private String department ;

    @Column(nullable = false) // Added a constraint to ensure address is not null
    private String title ;

    @Column(nullable = false) // Added a constraint to ensure address is not null
    private String degree ;

    @Column(nullable = false) // Added a constraint to ensure address is not null
    private String description ;


    @Column(nullable = false) // Added a constraint to ensure address is not null
    private double fees ;

    @Enumerated(EnumType.STRING) // Enum values stored as strings in the database
    @Column(nullable = false) // Added a constraint to ensure gender is not null
    private Doctor.Gender gender;



    // Enum for Gender
    public enum Gender {
        Male, Female, Other
    }
}
