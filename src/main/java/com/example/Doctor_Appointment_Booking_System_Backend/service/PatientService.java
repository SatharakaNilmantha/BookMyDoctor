package com.example.Doctor_Appointment_Booking_System_Backend.service;

import com.example.Doctor_Appointment_Booking_System_Backend.Exception.DuplicateException;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.PatientDto;
import com.example.Doctor_Appointment_Booking_System_Backend.entity.Patient;
import com.example.Doctor_Appointment_Booking_System_Backend.repository.PatientRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;



    public String patientSaved(PatientDto patientDto) {
        // Check for duplicate email
        if (patientRepository.existsByEmail(patientDto.getEmail())) {
            throw new DuplicateException("A patient with this email already exists.");
        }

        // Check for duplicate username
        if (patientRepository.existsByUserName(patientDto.getUserName())) {
            throw new DuplicateException("A patient with this username already exists.");
        }


        // Save the patient if no duplicates found
        patientRepository.save(modelMapper.map(patientDto, Patient.class));
        return "Patient Details Saved Successfully";
    }


    public List<PatientDto> AllPatient(){

        List patientList = patientRepository.findAll();
        return modelMapper.map(patientList , new TypeToken<List<PatientDto>>(){}.getType());
    }



    public PatientDto getPatientById(long patientId){

        try {
            Patient patient = patientRepository.getPatientById(patientId);
            return  modelMapper.map(patient ,PatientDto.class);
        }catch (Exception e){
            throw  new NotFoundException("Patient with ID " + patientId + " not found or couldn't be getten.");
        }
    }

}
