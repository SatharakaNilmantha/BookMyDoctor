package com.example.Doctor_Appointment_Booking_System_Backend.repository;

import com.example.Doctor_Appointment_Booking_System_Backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification ,Long> {
    List<Notification> findByPatientId(long patientId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE notification SET text = ?2 ,  status = ?3 , type=?4 ,date_time =?5 WHERE notification_id = ?1", nativeQuery = true)
    int updateNotification(long notificationId, String text, String status, String type, LocalDateTime dateTime);

    @Modifying
    @Transactional
    @Query(value = "UPDATE notification SET  status = ?2 WHERE notification_id = ?1", nativeQuery = true)
    int statusUpdate(long notificationId, String status);
}
