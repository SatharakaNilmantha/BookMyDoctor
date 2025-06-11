package com.example.Doctor_Appointment_Booking_System_Backend.controller;

import com.example.Doctor_Appointment_Booking_System_Backend.Exception.DuplicateException;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.NotificationDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.NotificationServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationServices notificationServices;

    @Autowired
    public NotificationController(NotificationServices notificationServices) {
        this.notificationServices = notificationServices;
    }

    @PostMapping("/saveNotification")
    public ResponseEntity<String> saveNotification(@RequestBody NotificationDto notificationDto) {
        try {
            String response = notificationServices.saveNotification(notificationDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 Created
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage()); // 409 Conflict for duplicates
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save notification: " + e.getMessage());
        }
    }

    @GetMapping("/getAllNotification")
    public ResponseEntity<?> getAllNotification() {
        try {
            List<NotificationDto> notificationList = notificationServices.getAllNotification();
            if (notificationList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No notifications found.");
            }
            return ResponseEntity.ok(notificationList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving notifications: " + e.getMessage());
        }
    }

    @GetMapping("/getNotificationByPatient/{patientId}")
    public ResponseEntity<?> getNotificationByPatient(@PathVariable long patientId) {
        try {
            List<NotificationDto> notifications = notificationServices.getNotificationByPatient(patientId);
            if (notifications.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No notifications found for patient id: " + patientId);
            }
            return ResponseEntity.ok(notifications);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving notifications: " + e.getMessage());
        }
    }

    @PutMapping("/{notificationId}")
    public ResponseEntity<String> updateNotification(@PathVariable long notificationId, @RequestBody NotificationDto notificationDto) {
        try {
            String updateResponse = notificationServices.updateNotification(notificationId, notificationDto);
            return ResponseEntity.ok(updateResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update notification: " + e.getMessage());
        }
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<String> deleteNotificationById(@PathVariable long notificationId) {
        try {
            String response = notificationServices.deleteNotificationById(notificationId);
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete notification: " + e.getMessage());
        }
    }
}
