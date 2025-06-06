package com.example.Doctor_Appointment_Booking_System_Backend.controller;

import com.example.Doctor_Appointment_Booking_System_Backend.Exception.DuplicateException;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.PatientDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.PatientServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value="api/patient")
public class PatientController {

    @Autowired
    private PatientServices patientServices;

    @Autowired
    private ObjectMapper objectMapper;



    // save patient details
    @PostMapping(value = "/savePatient", consumes = {"multipart/form-data"})
    public ResponseEntity<String> savePatient(@RequestPart("patient") String patientJson, @RequestPart("image") MultipartFile image) {

        try {
            // Manually convert JSON string to PatientDto
            PatientDto patientDto = objectMapper.readValue(patientJson, PatientDto.class);

            String result = patientServices.savePatient(patientDto, image);
            return new ResponseEntity<>(result, HttpStatus.CREATED);

        } catch (DuplicateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving patient: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    // get All  patient details
    @GetMapping("getPatient")
    public ResponseEntity<List<PatientDto>> getAllPatient(){

        List<PatientDto> patientlist = patientServices.AllPatient();
        return ResponseEntity.ok(patientlist);
    }



    // get  patient details using patientId
    @GetMapping("{patientId}")
    public ResponseEntity<?> getPatientById(@PathVariable long patientId){

        try {
            PatientDto patientFromId = patientServices.getPatientById(patientId);
            return new ResponseEntity<>(patientFromId, HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    // get  patient Image using patientId
    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getPatientPhoto(@PathVariable long id) {
        try {
            byte[] photo = patientServices.getPatientImageAsBytes(id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(photo, headers, HttpStatus.OK);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



    // update  patient image using patientId
    @PutMapping("{patientId}")
    public ResponseEntity<?> updatePatient(@PathVariable long patientId, @RequestBody PatientDto patientDto) {
        try {
            String updateResponse = patientServices.updatePatient(patientId, patientDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK); // Changed status to OK
        } catch (RuntimeException e) {
            // If the patient is not found, return a 404 Not Found status
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // For any unexpected errors, return a 500 Internal Server Error
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // update  patient image using patientId
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateImage(@PathVariable Long id, @RequestParam("image") MultipartFile file) {
        try {
            String response = patientServices.updateImage(id, file);
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // update  patient password using patientId
    @PutMapping("changePassword/{patientId}")
    public ResponseEntity<?> updatePatientPassword(@PathVariable long patientId, @RequestBody PatientDto patientDto) {
        try {
            String updateResponse = patientServices.updatePatientPassword(patientId, patientDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
