package com.example.Doctor_Appointment_Booking_System_Backend.service.serviceIMPL;


import com.example.Doctor_Appointment_Booking_System_Backend.Exception.DuplicateException;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.AppointmentDto;
import com.example.Doctor_Appointment_Booking_System_Backend.entity.Appointment;
import com.example.Doctor_Appointment_Booking_System_Backend.entity.Doctor;
import com.example.Doctor_Appointment_Booking_System_Backend.entity.Patient;
import com.example.Doctor_Appointment_Booking_System_Backend.repository.AppointmentRepository;
import com.example.Doctor_Appointment_Booking_System_Backend.repository.DoctorRepository;
import com.example.Doctor_Appointment_Booking_System_Backend.repository.PatientRepository;
import com.example.Doctor_Appointment_Booking_System_Backend.service.AppointmentServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService implements AppointmentServices {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;


    public String saveAppointment(AppointmentDto appointmentDto) {
        long patientId = appointmentDto.getPatientId();
        long doctorId = appointmentDto.getDoctorId();
        LocalDateTime appointmentDateTime = appointmentDto.getAppointmentDateTime();

        // Check if the doctor already has an appointment at the selected time
        if (appointmentRepository.existsByDoctor_DoctorIdAndAppointmentDateTime(doctorId, appointmentDateTime)) {
            throw new DuplicateException("The selected time slot is already booked. Please choose a different time.");
        }

        // Check if doctor exists
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(() -> new NotFoundException("Doctor not found"));

        // Check if patient exists
        Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new NotFoundException("Authentication required. Please log in to continue."));

        // Save the new appointment
        Appointment appointment = modelMapper.map(appointmentDto, Appointment.class);
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointmentRepository.save(appointment);

        return "Appointment booked successfully for ";
    }



    public List<AppointmentDto> getAllAppointments() {
        // Fetch all appointments and return them
        List<Appointment> appointments = appointmentRepository.findAll();
        return modelMapper.map(appointments, new TypeToken<List<AppointmentDto>>() {}.getType());
    }


    public AppointmentDto getAppointmentById(long appointmentId) {
        // Fetch appointment by ID
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new NotFoundException("Appointment not found"));
        return modelMapper.map(appointment, AppointmentDto.class);
    }


    public List<AppointmentDto> getAppointmentsByDoctor(long doctorId) {
        List<Appointment> appointments = appointmentRepository.findByDoctor_DoctorId(doctorId);
        return modelMapper.map(appointments, new TypeToken<List<AppointmentDto>>() {}.getType());
    }

    public List<AppointmentDto> getAppointmentsByPatient(long patientId) {
        List<Appointment> appointments = appointmentRepository.findByPatient_PatientId(patientId);
        return modelMapper.map(appointments, new TypeToken<List<AppointmentDto>>() {}.getType());
    }

    public String updateAppointment(long appointmentId, AppointmentDto appointmentDto) {
        if (appointmentRepository.existsById(appointmentId)) {
            // Perform the update using the repository method
            int updatedRows = appointmentRepository.UpdateAppointment(
                    appointmentId,
                    appointmentDto.getStatus()
            );
            // Check if any rows were updated
            if (updatedRows > 0) {
                return "Patient's Appointment successfully with ID " + appointmentId;
            } else {
                throw new RuntimeException("Failed to update Patient's Appointment  with ID " + appointmentId);
            }
        } else {
            // If the patient does not exist, throw an exception
            throw new RuntimeException("Patient's Appointment  not found with ID " + appointmentId);
        }
    }
    public String deleteAppointmentById(long appointmentId) {
        // Check if appointment exists
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new NotFoundException("Appointment not found"));

        // Delete appointment
        appointmentRepository.delete(appointment);
        return "Appointment deleted successfully";
    }


}
