package com.example.Doctor_Appointment_Booking_System_Backend.controller;


import com.example.Doctor_Appointment_Booking_System_Backend.dto.DoctorDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService ;


    @PostMapping("saveDoctor")
    public ResponseEntity<String> saveDoctor (@RequestBody DoctorDto doctorDto){

        String respond = doctorService.saveDoctor(doctorDto);
        return ResponseEntity.ok(respond);
    }

    @GetMapping ("getDoctor")
    public String getDoctor (){

        return  "save doctor";
    }
}
