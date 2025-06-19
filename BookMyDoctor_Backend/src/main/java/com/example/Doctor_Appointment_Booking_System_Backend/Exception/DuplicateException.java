package com.example.Doctor_Appointment_Booking_System_Backend.Exception;

public class DuplicateException extends RuntimeException{

    public  DuplicateException(String message){
        super(message);
    }
}
