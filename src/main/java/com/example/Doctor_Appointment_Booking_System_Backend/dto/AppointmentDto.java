package com.example.Doctor_Appointment_Booking_System_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {

    private long appointmentId;
    private long patientId;
    private long doctorId;
    private LocalDateTime appointmentDate;
}
