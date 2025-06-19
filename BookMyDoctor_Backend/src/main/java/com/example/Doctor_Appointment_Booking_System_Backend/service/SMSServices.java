package com.example.Doctor_Appointment_Booking_System_Backend.service;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.SMSSendRequestDto;

public interface SMSServices {

    public String sendSMS(SMSSendRequestDto requestDto) ;
}
