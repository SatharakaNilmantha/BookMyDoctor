package com.example.Doctor_Appointment_Booking_System_Backend.controller;

import com.example.Doctor_Appointment_Booking_System_Backend.Exception.DuplicateException;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.AdminDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping(value = "api/admins")
public class AdminController {

    @Autowired
    private AdminServices adminServices ;


    @PostMapping("saveAdmin")
    public ResponseEntity<String> saveAdmin(@RequestBody AdminDto adminDto) {
        try {
            // Call the service method to save the admin details
            String response = adminServices.savedAdmin(adminDto);
            return ResponseEntity.ok(response);  // Return 200 OK with success message
        } catch (DuplicateException e) {
            // If a duplicate email is found, return a 400 Bad Request with the error message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("getAdmin")
    public ResponseEntity<?> getAllAdmin() {
        try {
            List<AdminDto> adminList = adminServices.AllAdmin();
            return ResponseEntity.ok(adminList);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }



    @PutMapping("{adminId}")
    public ResponseEntity<?> updateAdmin(@PathVariable long adminId, @RequestBody AdminDto adminDto) {
        try {
            String updateResponse = adminServices.updateAdmin(adminId ,adminDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK); // Changed status to OK
        } catch (RuntimeException e) {
            // If the admin is not found, return a 404 Not Found status
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // For any unexpected errors, return a 500 Internal Server Error
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping("{adminId}")
    public ResponseEntity<String> deleteAdminById(@PathVariable long adminId)
    {

        try {

            String confirmResponse = adminServices.deleteAdminById(adminId);
            return ResponseEntity.ok(confirmResponse);
        } catch (NotFoundException e) {
            // Handle NotFoundException and return HTTP 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Handle any other exceptions and return HTTP 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }

    }


}

