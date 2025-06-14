package com.example.Doctor_Appointment_Booking_System_Backend.dto;

import lombok.Data;

@Data
public class SMSSendRequestDto {
    private String destinationSMSPhoneNumber;
    private String smsMessage;
}
