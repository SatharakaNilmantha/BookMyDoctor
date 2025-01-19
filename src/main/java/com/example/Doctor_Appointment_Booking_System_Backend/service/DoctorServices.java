package com.example.Doctor_Appointment_Booking_System_Backend.service;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.DoctorDto;


import java.util.List;

public interface DoctorServices {

    public String savedDoctor(DoctorDto doctorDto);

    public List<DoctorDto> AllDoctor();

    public DoctorDto getDoctorById(long doctorId);

    public String updateDoctor(long doctorId, DoctorDto doctorDto);


}
