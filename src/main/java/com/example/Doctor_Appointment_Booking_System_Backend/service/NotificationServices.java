package com.example.Doctor_Appointment_Booking_System_Backend.service;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.NotificationDto;

import java.util.List;

public interface NotificationServices {
    public String saveNotification(NotificationDto notificationDto) ;

    public List<NotificationDto> getAllNotification();

    public  List<NotificationDto> getNotificationByPatient(long patientId);

    public  String updateNotification(long notificationId, NotificationDto notificationDto);

    public  String deleteNotificationById(long notificationId);
}
