package com.example.Doctor_Appointment_Booking_System_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private long doctorId;
    private String address;
    private String degree;
    private String department;
    private String description;
    private double fees;
    private String fullName;
    private String gender;
    private byte[] image;
    private String phoneNumber;
    private String title;

    private String shiftStartTime;
    private String shiftEndTime;
    private String weekendStartTime;
    private String weekendEndTime;
    private String status;


}
