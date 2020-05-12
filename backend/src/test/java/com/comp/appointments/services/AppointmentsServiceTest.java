package com.comp.appointments.services;

import com.comp.appointments.domain.Appointment;
import com.comp.appointments.dtos.CreateAppointmentRequest;
import com.comp.appointments.repositories.AppointmentsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.ZonedDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AppointmentsServiceTest {

    @Mock
    private AppointmentsRepository repository;

    private AppointmentsService service;

    @BeforeEach
    public void setUp() {
        service = new AppointmentsService(repository);
    }

    @Test
    public void shouldCreateAppointment() {
        final CreateAppointmentRequest request = new CreateAppointmentRequest();
        request.title = "My appointment";
        request.start = ZonedDateTime.now();
        request.end = request.start.plusHours(1);

        final var captor = ArgumentCaptor.forClass(Appointment.class);
        when(repository.overlapping(request.start, request.end)).thenReturn(0);

        final UUID id = service.create(request);

        verify(repository).save(captor.capture());
        assertEquals(captor.getValue().id(), id);
        assertEquals(captor.getValue().start(), request.start);
        assertEquals(captor.getValue().end(), request.end);
    }

    @Test
    public void shouldNotCreateAppointment_withAppointmentExistingForInterval() {
        final CreateAppointmentRequest request = new CreateAppointmentRequest();
        request.title = "My appointment";
        request.start = ZonedDateTime.now();
        request.end = request.start.plusHours(1);

        when(repository.overlapping(request.start, request.end)).thenReturn(3);

        assertThrows(IllegalStateException.class, () -> service.create(request));
    }

}
