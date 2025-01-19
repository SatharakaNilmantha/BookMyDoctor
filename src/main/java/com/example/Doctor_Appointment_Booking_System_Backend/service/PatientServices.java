package com.example.Doctor_Appointment_Booking_System_Backend.service;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.PatientDto;

import java.util.List;

public interface PatientServices {
    public String patientSaved(PatientDto patientDto);
    public List<PatientDto> AllPatient();
    public PatientDto getPatientById(long patientId);
    public String updatePatient(long patientId, PatientDto patientDto);
}
