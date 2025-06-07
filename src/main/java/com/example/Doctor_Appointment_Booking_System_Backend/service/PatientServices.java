package com.example.Doctor_Appointment_Booking_System_Backend.service;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.PatientDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PatientServices {
    public String savePatient(PatientDto patientDto, MultipartFile image);
    public List<PatientDto> AllPatient();
    public PatientDto getPatientById(long patientId);
    public String updatePatient(long patientId, PatientDto patientDto);
    public byte[] getPatientImageAsBytes(long id);
    public  String updatePatientPassword(long patientId, PatientDto patientDto);

    String updateImage(Long id, MultipartFile file);

    public String loginPatient(String email, String password);
}
