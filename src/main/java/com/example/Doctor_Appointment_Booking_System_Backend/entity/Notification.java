package com.example.Doctor_Appointment_Booking_System_Backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Notification {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long notificationId;

    @Column(nullable = false)
    private long patientId;

    @Column(nullable = false)
    private long doctorId;

    @Column(nullable = false)
    private LocalDateTime appointmentDateTime;

    @Column(nullable = false)
    private String text ;

    @Column(nullable = false)
    private  String type ;

    @Column(nullable = false)
    private String status ;

    @Column(nullable = false)
    private LocalDateTime dateTime;
}
