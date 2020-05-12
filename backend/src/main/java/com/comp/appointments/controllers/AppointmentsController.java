package com.comp.appointments.controllers;

import com.comp.appointments.dtos.CreateAppointmentRequest;
import com.comp.appointments.services.AppointmentsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.UUID;

import static java.net.URI.create;
import static org.springframework.http.ResponseEntity.created;

@RestController
@RequestMapping("/appointments")
@AllArgsConstructor
public class AppointmentsController {
    private final AppointmentsService service;

    @PostMapping
    public ResponseEntity<Void> createAppointment(@RequestBody @Valid final CreateAppointmentRequest request) {
        final UUID appointmentId = service.create(request);
        return created(create("/appointments/" + appointmentId.toString())).build();
    }
}
