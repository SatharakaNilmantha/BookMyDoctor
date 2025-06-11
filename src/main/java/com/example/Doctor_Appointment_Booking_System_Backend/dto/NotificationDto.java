package com.example.Doctor_Appointment_Booking_System_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private long notificationId;
    private long patientId;
    private long doctorId;
    private LocalDateTime appointmentDateTime;
    private String text;
    private String type;
    private String status;
}
