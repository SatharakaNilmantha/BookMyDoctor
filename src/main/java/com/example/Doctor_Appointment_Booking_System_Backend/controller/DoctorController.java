package com.example.Doctor_Appointment_Booking_System_Backend.controller;

import com.example.Doctor_Appointment_Booking_System_Backend.Exception.DuplicateException;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.DoctorDto;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.PatientDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.DoctorServices;
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
@RequestMapping(value = "api/doctors")
public class DoctorController {

    @Autowired
    private DoctorServices doctorServices;

    @Autowired
    private ObjectMapper objectMapper;



    // save doctor details
    @PostMapping(value = "/saveDoctor", consumes = {"multipart/form-data"})
    public ResponseEntity<String> saveDoctor(@RequestPart("doctor") String DoctorJson, @RequestPart("image") MultipartFile image) {

        try {
            // Manually convert JSON string to PatientDto
            DoctorDto doctorDto = objectMapper.readValue(DoctorJson, DoctorDto.class);

            String result = doctorServices.savedDoctor(doctorDto, image);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (DuplicateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving patient: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // get all  doctor details
    @GetMapping("getDoctor")
    public ResponseEntity<?> getAllDoctor(){

        try {
            List<DoctorDto> doctorlist = doctorServices.AllDoctor();
            return ResponseEntity.ok(doctorlist);
        }catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }


    // get  doctor details using doctorId
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


    // get  Doctor Image using patientId
    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getDoctorPhoto(@PathVariable long id) {
        try {
            byte[] photo = doctorServices.getDoctorImageAsBytes(id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(photo, headers, HttpStatus.OK);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



    // update  doctor details using doctorId
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


    // update  Doctor image using doctorId
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateImage(@PathVariable Long id, @RequestParam("image") MultipartFile file) {
        try {
            String response = doctorServices.updateImage(id, file);
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("{doctorId}")
    public ResponseEntity<String> deleteDoctorById(@PathVariable long doctorId)
    {
        try {
            String confirmResponse = doctorServices.deleteDoctorById(doctorId);
            return ResponseEntity.ok(confirmResponse);
        } catch (NotFoundException e) {
            // Handle NotFoundException and return HTTP 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Handle any other exceptions and return HTTP 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }

    }

}
