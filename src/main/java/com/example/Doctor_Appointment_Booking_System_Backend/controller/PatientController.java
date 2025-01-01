package com.example.Doctor_Appointment_Booking_System_Backend.controller;

import com.example.Doctor_Appointment_Booking_System_Backend.Exception.DuplicateException;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.PatientDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="api/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;



    @PostMapping("savePatient")
    public ResponseEntity<String> savePatient(@RequestBody PatientDto patientDto) {
        try {
            String response = patientService.patientSaved(patientDto);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (DuplicateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getPatient")
    public ResponseEntity<List<PatientDto>> getAllPatient(){

        List<PatientDto> patientlist = patientService.AllPatient();
        return ResponseEntity.ok(patientlist);
    }


    @GetMapping("{patientId}")
    public ResponseEntity<?> getPatientById(@PathVariable long patientId){

        try {
            PatientDto patientFromId = patientService.getPatientById(patientId);
            return new ResponseEntity<>(patientFromId, HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("{patientId}")
    public ResponseEntity<?> updatePatient(@PathVariable long patientId, @RequestBody PatientDto patientDto) {
        try {
            String updateResponse = patientService.updatePatient(patientId, patientDto);
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
