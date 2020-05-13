package com.comp.appointments.controllers;

import com.comp.appointments.dtos.CreateAppointmentRequest;
import com.comp.appointments.dtos.GetAppointmentsResponse;
import com.comp.appointments.services.AppointmentsService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.ZonedDateTime;
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

    @GetMapping
    public ResponseEntity<GetAppointmentsResponse> getAll(@RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) final ZonedDateTime from,
                                                          @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) final ZonedDateTime to) {
        final var data = service.findAll(from, to);
        return ResponseEntity.ok(new GetAppointmentsResponse(data));
    }
}
