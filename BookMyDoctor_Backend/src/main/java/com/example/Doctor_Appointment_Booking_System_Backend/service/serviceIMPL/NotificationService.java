package com.example.Doctor_Appointment_Booking_System_Backend.service.serviceIMPL;


import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.NotificationDto;
import com.example.Doctor_Appointment_Booking_System_Backend.entity.Notification;
import com.example.Doctor_Appointment_Booking_System_Backend.repository.NotificationRepository;
import com.example.Doctor_Appointment_Booking_System_Backend.service.NotificationServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class NotificationService implements NotificationServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private NotificationRepository notificationRepository ;



    public String saveNotification(NotificationDto notificationDto) {
        try {
            notificationRepository.save(modelMapper.map(notificationDto, Notification.class));
            return  "Notification send successfully" ;
        }catch (Exception e){
            return "unexpected error" + e ;
        }
    }


    public List<NotificationDto> getAllNotification() {
        // Fetch all getAllNotification and return them
        List<Notification> notifications = notificationRepository.findAll();
        return modelMapper.map(notifications, new TypeToken<List<NotificationDto>>() {}.getType());
    }


    public List<NotificationDto> getNotificationByPatient(long patientId) {
        List<Notification> notifications = notificationRepository.findByPatientId(patientId);
        return modelMapper.map(notifications, new TypeToken<List<NotificationDto>>() {}.getType());
    }


    public String updateNotification(long notificationId, NotificationDto notificationDto) {
        if (notificationRepository.existsById(notificationId)) {
            // Perform the update using the repository method
            int updatedRows = notificationRepository.updateNotification(
                    notificationId,
                    notificationDto.getText(),
                    notificationDto.getStatus(),
                    notificationDto.getType(),
                    notificationDto.getDateTime()
            );
            // Check if any rows were updated
            if (updatedRows > 0) {
                return " Notification update  successfully with ID " + notificationId;
            } else {
                throw new RuntimeException("Failed to update Notification  with ID " + notificationId);
            }
        } else {
            // If the patient does not exist, throw an exception
            throw new RuntimeException("Patient's Notification  not found with ID " + notificationId);
        }
    }

    public String statusUpdate(long notificationId, NotificationDto notificationDto) {
        if (notificationRepository.existsById(notificationId)) {
            // Perform the update using the repository method
            int updatedRows = notificationRepository.statusUpdate(
                    notificationId,
                    notificationDto.getStatus()
            );
            // Check if any rows were updated
            if (updatedRows > 0) {
                return " Notification update  successfully with ID " + notificationId;
            } else {
                throw new RuntimeException("Failed to update Notification  with ID " + notificationId);
            }
        } else {
            // If the patient does not exist, throw an exception
            throw new RuntimeException("Patient's Notification  not found with ID " + notificationId);
        }
    }
    public String deleteNotificationById (long notificationId) {
        // Check if notification exists
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(() -> new NotFoundException("Appointment not found"));

        // Delete notification
        notificationRepository.delete(notification);
        return "Appointment deleted successfully";
    }


}
