package com.example.Doctor_Appointment_Booking_System_Backend.service;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.DoctorDto;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

public interface DoctorServices {

    public String savedDoctor(DoctorDto doctorDto, MultipartFile image);

    public List<DoctorDto> AllDoctor();

    public DoctorDto getDoctorById(long doctorId);

    public String updateImage(Long id, MultipartFile file);

    public String updateDoctor(long doctorId, DoctorDto doctorDto);

    public String deleteDoctorById(long doctorId);

    byte[] getDoctorImageAsBytes(long id);


}
