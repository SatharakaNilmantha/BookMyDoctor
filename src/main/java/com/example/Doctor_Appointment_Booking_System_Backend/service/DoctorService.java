package com.example.Doctor_Appointment_Booking_System_Backend.service;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.DoctorDto;
import com.example.Doctor_Appointment_Booking_System_Backend.entity.Doctor;
import com.example.Doctor_Appointment_Booking_System_Backend.repository.DoctorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    @Autowired
    private ModelMapper modelMapper ;
    @Autowired
    private DoctorRepository doctorRepository ;


    public String saveDoctor (DoctorDto doctorDto){

        doctorRepository.save(modelMapper.map(doctorDto, Doctor.class));
        return "Doctor Details Saved Successfully";
    }


}
