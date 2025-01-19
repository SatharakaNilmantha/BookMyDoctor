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
    private DoctorRepository doctorRepository;

    @Autowired
    private ModelMapper modelMapper;

    public String savedDoctor(DoctorDto doctorDto) {

        // Check if doctor with the same full_name, phone_number, department, and title already exists
        boolean exists = doctorRepository.existsByFullNameAndPhoneNumberAndDepartmentAndTitle(
                doctorDto.getFullName(),
                doctorDto.getPhoneNumber(),
                doctorDto.getDepartment(),
                doctorDto.getTitle()
        );

        if (exists) {
            return "Doctor with the same details already exists.";
        }

        // Save the doctor if not already exists
        doctorRepository.save(modelMapper.map(doctorDto, Doctor.class));
        return "Doctor saved successfully  ";
    }


}
