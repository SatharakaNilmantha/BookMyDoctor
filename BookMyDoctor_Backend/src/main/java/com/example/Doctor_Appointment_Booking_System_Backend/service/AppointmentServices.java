package com.example.Doctor_Appointment_Booking_System_Backend.service;



import com.example.Doctor_Appointment_Booking_System_Backend.dto.AppointmentDto;

import java.util.List;

public interface AppointmentServices {

    // Method to save a new appointment
    String saveAppointment(AppointmentDto appointmentDto);

    // Method to get a list of all appointments
    List<AppointmentDto> getAllAppointments();

    // Method to get an appointment by its ID
    AppointmentDto getAppointmentById(long appointmentId);

    // Method to delete an appointment by its ID

    String deleteAppointmentById(long appointmentId);

    public List<AppointmentDto> getAppointmentsByDoctor(long doctorId);

    public List<AppointmentDto> getAppointmentsByPatient(long patientId);

    String updateAppointment(long appointmentId, AppointmentDto appointmentDto);
}
