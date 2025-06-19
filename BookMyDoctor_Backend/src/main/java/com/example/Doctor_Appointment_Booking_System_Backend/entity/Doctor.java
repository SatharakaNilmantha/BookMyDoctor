package com.example.Doctor_Appointment_Booking_System_Backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Blob;
import java.time.LocalTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long doctorId;

    @Lob
    private Blob image; // Changed from Byte to byte[] for storing images

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String degree;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double fees;


    @Column(name = "shift_start_time", nullable = false)
    private String shiftStartTime;

    @Column(name = "shift_end_time", nullable = false)
    private String shiftEndTime;

    @Column(name = "weekend_start_time", nullable = false)
    private String weekendStartTime;

    @Column(name = "weekend_end_time", nullable = false)
    private String weekendEndTime;

    @Column(nullable = false)
    private String status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    // Enum for Gender
    public enum Gender {
        Male, Female, Other
    }
}

