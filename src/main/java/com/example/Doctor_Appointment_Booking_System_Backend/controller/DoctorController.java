package com.example.Doctor_Appointment_Booking_System_Backend.controller;

import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.DoctorDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.DoctorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/doctors")
public class DoctorController {

    @Autowired
    private DoctorServices doctorServices;

    @PostMapping("saveDoctor")
    public ResponseEntity<String> saveDoctor(@RequestBody DoctorDto doctorDto) {
        String response =doctorServices.savedDoctor(doctorDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("getDoctor")
    public ResponseEntity<List<DoctorDto>> getAllDoctor(){
        List<DoctorDto> doctorlist = doctorServices.AllDoctor();
        return ResponseEntity.ok(doctorlist);
    }


    @GetMapping("{doctorId}")
    public ResponseEntity<?> getDoctorById(@PathVariable long doctorId){

        try {
            DoctorDto doctorFromId = doctorServices.getDoctorById(doctorId);
            return new ResponseEntity<>(doctorFromId, HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("{doctorId}")
    public ResponseEntity<?> updateDoctor(@PathVariable long doctorId, @RequestBody DoctorDto doctorDto) {
        try {
            String updateResponse = doctorServices.updateDoctor(doctorId ,doctorDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK); // Changed status to OK
        } catch (RuntimeException e) {
            // If the patient is not found, return a 404 Not Found status
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // For any unexpected errors, return a 500 Internal Server Error
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
