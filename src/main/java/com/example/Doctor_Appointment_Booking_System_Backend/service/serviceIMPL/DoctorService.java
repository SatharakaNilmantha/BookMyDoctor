package com.example.Doctor_Appointment_Booking_System_Backend.service.serviceIMPL;

import com.example.Doctor_Appointment_Booking_System_Backend.Exception.DuplicateException;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.AdminDto;
import com.example.Doctor_Appointment_Booking_System_Backend.dto.DoctorDto;
import com.example.Doctor_Appointment_Booking_System_Backend.entity.Doctor;
import com.example.Doctor_Appointment_Booking_System_Backend.entity.Patient;
import com.example.Doctor_Appointment_Booking_System_Backend.repository.DoctorRepository;
import com.example.Doctor_Appointment_Booking_System_Backend.service.DoctorServices;
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
public class DoctorService implements DoctorServices {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ModelMapper modelMapper;

    // save doctor details
    public String savedDoctor(DoctorDto doctorDto, MultipartFile image) {
        try {
            // Check if doctor with the same full_name, phone_number, department, and title already exists
            boolean exists = doctorRepository.existsByFullNameAndPhoneNumberAndDepartmentAndTitle(
                    doctorDto.getFullName(),
                    doctorDto.getPhoneNumber(),
                    doctorDto.getDepartment(),
                    doctorDto.getTitle()
            );

            if (exists) {
                throw new DuplicateException("Doctor with the same details already exists.");
            }

            // Map DTO to entity
            Doctor doctor = modelMapper.map(doctorDto, Doctor.class);
            doctor.setGender(Doctor.Gender.valueOf(doctorDto.getGender()));

            // Handle image if provided
            if (image != null && !image.isEmpty()) {
                try {
                    Blob imageBlob = new SerialBlob(image.getBytes());
                    doctor.setImage(imageBlob);
                } catch (Exception e) {
                    throw new RuntimeException("Failed to process image: " + e.getMessage());
                }
            }

            doctorRepository.save(doctor);
            return "Doctor saved successfully";

        } catch (Exception e) {
            throw new RuntimeException("An error occurred while saving the doctor: " + e.getMessage(), e);
        }
    }


    public List<DoctorDto> AllDoctor(){
        List doctorList = doctorRepository.findAll();
        if (doctorList.isEmpty()) {
            throw new NotFoundException("No Doctors found in the database.");
        }
        return modelMapper.map(doctorList , new TypeToken<List<DoctorDto>>(){}.getType());
    }


    public DoctorDto getDoctorById(long doctorId){

        try {
            Doctor doctor = doctorRepository.getDoctorById(doctorId);
            return  modelMapper.map(doctor, DoctorDto.class);
        }catch (Exception e){
            throw  new NotFoundException("Doctor with ID " + doctorId + " not found or couldn't be getten.");
        }
    }


    // get  doctor Image using doctorId
    public byte[] getDoctorImageAsBytes(long id) {
        Optional<Doctor> optionalUser = doctorRepository.findById(id);
        if (optionalUser.isPresent()) {
            Doctor doctor = optionalUser.get();
            try {
                return doctor.getImage().getBytes(1, (int) doctor.getImage().length());
            } catch (Exception e) {
                throw new RuntimeException("Error reading photo bytes: " + e.getMessage());
            }
        } else {
            throw new NotFoundException("User not found with ID: " + id);
        }
    }


    // update  doctor image using doctorId
    public String updateImage(Long id, MultipartFile file) {

        Optional<Doctor> optionalImage = doctorRepository.findById(id);

        if (!optionalImage.isPresent()) {
            throw new NotFoundException("Image not found with ID: " + id);
        }

        try {
            Doctor image = optionalImage.get();
            byte[] bytes = file.getBytes();
            Blob blob = new SerialBlob(bytes);
            image.setImage(blob);
            doctorRepository.save(image);
            return "Image updated successfully";
        } catch (Exception e) {
            throw new RuntimeException("Error updating image: " + e.getMessage());
        }
    }



    // update  doctor details using doctorId
    public String updateDoctor(long doctorId, DoctorDto doctorDto) {
        // Validate that the DoctorDto and all required fields are not null or empty
        if (doctorDto == null) {
            throw new IllegalArgumentException("Doctor details cannot be null.");
        }
        if (doctorDto.getFullName() == null || doctorDto.getFullName().trim().isEmpty()) {
            throw new IllegalArgumentException("Full name is required.");
        }
        if (doctorDto.getAddress() == null || doctorDto.getAddress().trim().isEmpty()) {
            throw new IllegalArgumentException("Address is required.");
        }
        if (doctorDto.getGender() == null || doctorDto.getGender().trim().isEmpty()) {
            throw new IllegalArgumentException("Gender is required.");
        }
        if (doctorDto.getPhoneNumber() == null || doctorDto.getPhoneNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required.");
        }
        if (doctorDto.getDegree() == null || doctorDto.getDegree().trim().isEmpty()) {
            throw new IllegalArgumentException("Degree is required.");
        }
        if (doctorDto.getDepartment() == null || doctorDto.getDepartment().trim().isEmpty()) {
            throw new IllegalArgumentException("Department is required.");
        }
        if (doctorDto.getTitle() == null || doctorDto.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required.");
        }
        if (doctorDto.getDescription() == null || doctorDto.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Description is required.");
        }


        // Check if the doctor exists in the repository
        if (!doctorRepository.existsById(doctorId)) {
            throw new RuntimeException("Doctor not found with ID " + doctorId);
        }

        // Perform the update using the repository method
        int updatedRows = doctorRepository.updateDoctorById(
                doctorId,
                doctorDto.getFullName(),
                doctorDto.getAddress(),
                doctorDto.getGender(),
                doctorDto.getPhoneNumber(),
                doctorDto.getDegree(),
                doctorDto.getDepartment(),
                doctorDto.getTitle(),
                doctorDto.getDescription(),
                doctorDto.getFees(),
                doctorDto.getShiftStartTime(),
                doctorDto.getShiftEndTime(),
                doctorDto.getWeekendStartTime(),
                doctorDto.getWeekendEndTime(),
                doctorDto.getStatus()
        );

        // Check if any rows were updated
        if (updatedRows > 0) {
            return "Doctor updated successfully with ID " + doctorId;
        } else {
            throw new RuntimeException("Failed to update doctor with ID " + doctorId);
        }
    }



    public String deleteDoctorById(long doctorId) {

        try {
            // Assuming `bookRepository.deleteBookByIdBook(bookId)` returns the number of affected rows
            int deletedRows = doctorRepository.deleteDoctorById(doctorId);

            if (deletedRows == 0) {
                // If no rows were deleted, throw custom exception
                throw new NotFoundException("Doctor with ID " + doctorId + " not found or couldn't be deleted.");
            }

            return "Deleted successfully " + doctorId;

        } catch (NotFoundException e) {
            throw e;
        }

    }


}
