package com.example.Doctor_Appointment_Booking_System_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDto {

    private long adminId ;
    private String fullName;
    private String phoneNumber;
    private String email ;
    private String password ;
}
