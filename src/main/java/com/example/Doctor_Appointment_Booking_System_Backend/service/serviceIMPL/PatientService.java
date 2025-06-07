package com.example.Doctor_Appointment_Booking_System_Backend.service.serviceIMPL;

import com.example.Doctor_Appointment_Booking_System_Backend.Exception.DuplicateException;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.PatientDto;
import com.example.Doctor_Appointment_Booking_System_Backend.entity.Patient;
import com.example.Doctor_Appointment_Booking_System_Backend.repository.PatientRepository;
import com.example.Doctor_Appointment_Booking_System_Backend.service.PatientServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.Blob;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService implements PatientServices {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;





 // save patient details
    public String savePatient(PatientDto patientDto, MultipartFile image) {
        try {
            if (patientRepository.existsByEmail(patientDto.getEmail())) {
                throw new DuplicateException("A patient with this email already exists.");
            }

            Patient patient = modelMapper.map(patientDto, Patient.class);
            patient.setGender(Patient.Gender.valueOf(patientDto.getGender()));

            if (image != null && !image.isEmpty()) {
                Blob imageBlob = new SerialBlob(image.getBytes());
                patient.setImage(imageBlob);
            }

            patientRepository.save(patient);
            return "Patient details saved successfully.";
        } catch (DuplicateException e) {
            throw e; // let the controller handle it
        } catch (Exception e) {
            return "An error occurred while saving the patient: " + e.getMessage();
        }
    }



    // get All  patient details
    public List<PatientDto> AllPatient(){

        List patientList = patientRepository.findAll();
        return modelMapper.map(patientList , new TypeToken<List<PatientDto>>(){}.getType());
    }



    // get  patient details using patientId
    public PatientDto getPatientById(long patientId){

        try {
            Patient patient = patientRepository.getPatientById(patientId);
            return  modelMapper.map(patient ,PatientDto.class);
        }catch (Exception e){
            throw  new NotFoundException("Patient with ID " + patientId + " not found or couldn't be getten.");
        }
    }


    // get  patient Image using patientId
    public byte[] getPatientImageAsBytes(long id) {
        Optional<Patient> optionalUser = patientRepository.findById(id);
        if (optionalUser.isPresent()) {
            Patient user = optionalUser.get();
            try {
                return user.getImage().getBytes(1, (int) user.getImage().length());
            } catch (Exception e) {
                throw new RuntimeException("Error reading photo bytes: " + e.getMessage());
            }
        } else {
            throw new NotFoundException("User not found with ID: " + id);
        }
    }


    // update  patient details using patientId
    public String updatePatient(long patientId, PatientDto patientDto) {
        // Validate that the PatientDto and all required fields are not null or empty
        if (patientDto == null) {
            throw new IllegalArgumentException("Patient details cannot be null.");
        }
        if (patientDto.getFullName() == null || patientDto.getFullName().isEmpty()) {
            throw new IllegalArgumentException("Full name is required.");
        }
        if (patientDto.getAddress() == null || patientDto.getAddress().isEmpty()) {
            throw new IllegalArgumentException("Address is required.");
        }
        if (patientDto.getGender() == null || patientDto.getGender().isEmpty()) {
            throw new IllegalArgumentException("Gender is required.");
        }

        if (patientDto.getPhoneNumber() == null || patientDto.getPhoneNumber().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required.");
        }
        if (patientDto.getDob() == null) {
            throw new IllegalArgumentException("Date of birth is required.");
        }

        // Check if the patient exists in the repository
        if (patientRepository.existsById(patientId)) {
            // Perform the update using the repository method
            int updatedRows = patientRepository.updatePatientById(
                    patientId,
                    patientDto.getFullName(),
                    patientDto.getAddress(),
                    patientDto.getGender(),
                    patientDto.getPhoneNumber(),
                    patientDto.getDob()
            );

            // Check if any rows were updated
            if (updatedRows > 0) {
                return "Patient updated successfully with ID " + patientId;
            } else {
                throw new RuntimeException("Failed to update patient with ID " + patientId);
            }
        } else {
            // If the patient does not exist, throw an exception
            throw new RuntimeException("Patient not found with ID " + patientId);
        }
    }


    // update  patient image using patientId
    public String updateImage(Long id, MultipartFile file) {
        Optional<Patient> optionalImage = patientRepository.findById(id);

        if (!optionalImage.isPresent()) {
            throw new NotFoundException("Image not found with ID: " + id);
        }

        try {
            Patient image = optionalImage.get();
            byte[] bytes = file.getBytes();
            Blob blob = new SerialBlob(bytes);
            image.setImage(blob);
            patientRepository.save(image);
            return "Image updated successfully";
        } catch (Exception e) {
            throw new RuntimeException("Error updating image: " + e.getMessage());
        }
    }


    // update  patient password using patientId
    public String updatePatientPassword(long patientId, PatientDto patientDto) {
        if (patientDto.getPassword() == null || patientDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("New password is required.");
        }
        if (patientDto.getCurrentPassword() == null || patientDto.getCurrentPassword().isEmpty()) {
            throw new IllegalArgumentException("Current password is required.");
        }

        // Fetch patient from repository
        Optional<Patient> existingPatient = patientRepository.findById(patientId);

        if (existingPatient.isPresent()) {
            Patient patient = existingPatient.get();

            // Check if the provided current password matches the stored password
            if (!patient.getPassword().equals(patientDto.getCurrentPassword())) {
                throw new IllegalArgumentException("Current password is incorrect.");
            }

            // Ensure the new password is not the same as the old one
            if (patient.getPassword().equals(patientDto.getPassword())) {
                throw new IllegalArgumentException("New password cannot be the same as the current password.");
            }

            // Update the password
            int updatedRows = patientRepository.updatePatientPassword(patientId, patientDto.getPassword());

            if (updatedRows > 0) {
                return "Password updated successfully " ;
            } else {
                throw new RuntimeException("Failed to update password for Patient ID " + patientId);
            }
        } else {
            throw new RuntimeException("Patient not found with ID " + patientId);
        }
    }



    public String loginPatient(String email, String password) {
        Patient patient = patientRepository.findByEmail(email);

        if (patient == null) {
            throw new NotFoundException("No patient found with this email.");
        }

        if (!patient.getPassword().equals(password)) {
            throw new IllegalArgumentException("Incorrect password.");
        }

        // Constructing JSON manually as a string
        return String.format("{\"message\": \"Login successful\", \"patientId\": %d}", patient.getPatientId());
    }


}
