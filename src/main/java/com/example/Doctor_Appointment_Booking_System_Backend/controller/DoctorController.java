package com.example.Doctor_Appointment_Booking_System_Backend.controller;


import com.example.Doctor_Appointment_Booking_System_Backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService ;


    @PostMapping("saveDoctor")
    public String saveDoctor (){

        return  "save doctor";
    }

    @GetMapping ("getDoctor")
    public String getDoctor (){

        return  "save doctor";
    }
}
