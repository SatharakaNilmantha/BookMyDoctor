package com.example.Doctor_Appointment_Booking_System_Backend.service.serviceIMPL;

import com.example.Doctor_Appointment_Booking_System_Backend.dto.SMSSendRequestDto;
import com.example.Doctor_Appointment_Booking_System_Backend.service.SMSServices;
import com.example.Doctor_Appointment_Booking_System_Backend.Exception.NotFoundException;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@Slf4j
public class SMSService implements SMSServices {

    @Value("${TWILIO_ACCOUNT_SID}")
    private String ACCOUNT_SID;

    @Value("${TWILIO_AUTH_TOKEN}")
    private String AUTH_TOKEN;

    @Value("${TWILIO_OUTGOING_SMS_NUMBER}")
    private String OUTGOING_SMS_NUMBER;

    @PostConstruct
    public void initTwilio() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        log.info("Twilio initialized with SID: {}", ACCOUNT_SID);
    }

    @Override
    public String sendSMS(SMSSendRequestDto requestDto) {
        try {
            Message message = Message.creator(
                    new PhoneNumber(requestDto.getDestinationSMSPhoneNumber()),
                    new PhoneNumber(OUTGOING_SMS_NUMBER),
                    requestDto.getSmsMessage()
            ).create();

            String status = message.getStatus().toString();
            log.info("SMS sent successfully. Status: {}", status);

            return "SMS sent to the relevant patient successfully. Status: " + status;

        } catch (Exception e) {
            log.error("Failed to send SMS to {}", requestDto.getDestinationSMSPhoneNumber(), e);
            throw new NotFoundException("Failed to send SMS: " + e.getMessage());
        }
    }
}
