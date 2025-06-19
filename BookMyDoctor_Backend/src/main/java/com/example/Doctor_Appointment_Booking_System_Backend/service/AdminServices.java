package com.example.Doctor_Appointment_Booking_System_Backend.service;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.AdminDto;

import java.util.List;


public interface AdminServices  {

    public String savedAdmin(AdminDto adminDto);

    public List<AdminDto> AllAdmin();

    public String updateAdmin(long adminId, AdminDto adminDto);

    public String deleteAdminById(long adminId);

}
