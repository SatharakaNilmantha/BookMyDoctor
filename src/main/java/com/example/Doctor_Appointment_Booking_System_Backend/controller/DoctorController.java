package com.example.Doctor_Appointment_Booking_System_Backend.controller;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.DoctorDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("saveDoctor")
    public ResponseEntity<String> saveDoctor(@RequestBody DoctorDto doctorDto) {
        String response =doctorService.savedDoctor(doctorDto);
        return ResponseEntity.ok(response);
    }

}
