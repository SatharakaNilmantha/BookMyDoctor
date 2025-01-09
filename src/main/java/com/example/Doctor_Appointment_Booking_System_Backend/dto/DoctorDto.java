package com.example.Doctor_Appointment_Booking_System_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDto {

    private long DoctorId;
    private String image;
    private String fullName;
    private String gender;
    private String phoneNumber;
    private String address;
    private String department ;
    private String title ;
    private String degree ;
    private String description ;
    private double fees ;

}
