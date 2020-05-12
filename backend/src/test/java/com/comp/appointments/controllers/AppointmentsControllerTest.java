package com.comp.appointments.controllers;

import com.comp.appointments.dtos.CreateAppointmentRequest;
import com.comp.appointments.services.AppointmentsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.ZonedDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AppointmentsControllerTest {

    @Mock
    private AppointmentsService service;

    private AppointmentsController controller;

    @BeforeEach
    public void setUp() {
        controller = new AppointmentsController(service);
    }

    @Test
    public void shouldCreateAppointment() {
        final CreateAppointmentRequest request = new CreateAppointmentRequest();
        request.title = "My appointment";
        request.start = ZonedDateTime.now();
        request.end = ZonedDateTime.now().plusHours(1);
        final UUID appointmentId = UUID.randomUUID();

        when(service.create(request)).thenReturn(appointmentId);

        final ResponseEntity<Void> result = controller.createAppointment(request);

        verify(service).create(request);
        assertNotNull(result);
        assertEquals(result.getStatusCode(), HttpStatus.CREATED);
    }
}
