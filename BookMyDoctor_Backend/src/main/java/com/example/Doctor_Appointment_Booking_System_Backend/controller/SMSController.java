package com.example.Doctor_Appointment_Booking_System_Backend.controller;


import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.SMSSendRequestDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.SMSServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/sms")
public class SMSController {

    @Autowired
    private SMSServices smsServices;



    @PostMapping("send")
    public ResponseEntity<String> sendSMS(@RequestBody SMSSendRequestDto requestDto) {
        try {
            String response = smsServices.sendSMS(requestDto);
            return ResponseEntity.ok(response);  // Return 200 OK with success message
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}