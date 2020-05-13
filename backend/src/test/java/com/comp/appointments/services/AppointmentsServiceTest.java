package com.comp.appointments.services;

import com.comp.appointments.domain.Appointment;
import com.comp.appointments.dtos.AppointmentDto;
import com.comp.appointments.dtos.CreateAppointmentRequest;
import com.comp.appointments.repositories.AppointmentsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AppointmentsServiceTest {

    @Mock
    private AppointmentsRepository repository;
    @Mock
    private DomainToDtoMapper mapper;

    private AppointmentsService service;

    @BeforeEach
    public void setUp() {
        service = new AppointmentsService(repository, mapper);
    }

    @Test
    public void shouldCreateAppointment() {
        final var start = ZonedDateTime.now().withHour(12);
        final var end = start.plusHours(1);
        final var request = new CreateAppointmentRequest("My appointment", start, end);

        final var captor = ArgumentCaptor.forClass(Appointment.class);
        when(repository.overlapping(request.getStart(), request.getEnd())).thenReturn(0);

        final UUID id = service.create(request);

        verify(repository).save(captor.capture());
        assertEquals(captor.getValue().id(), id);
        assertNotNull(captor.getValue().interval());
        assertEquals(captor.getValue().interval().start(), request.getStart());
        assertEquals(captor.getValue().interval().end(), request.getEnd());
    }

    @Test
    public void shouldNotCreateAppointment_withAppointmentExistingForInterval() {
        final var start = ZonedDateTime.now().withHour(12);
        final var end = start.plusHours(1);
        final var request = new CreateAppointmentRequest("My appointment", start, end);

        when(repository.overlapping(request.getStart(), request.getEnd())).thenReturn(3);

        assertThrows(IllegalStateException.class, () -> service.create(request));
    }

    @Test
    public void shouldFindAllAppointments() {
        final var from = ZonedDateTime.now().minusDays(5);
        final var to = ZonedDateTime.now().plusDays(5);
        final var appointment = mock(Appointment.class);
        final var dto = mock(AppointmentDto.class);

        when(repository.findAllBetween(from, to)).thenReturn(Collections.singletonList(appointment));
        when(mapper.map(appointment)).thenReturn(dto);

        final var result = service.findAll(from, to);

        assertNotNull(result);
        assertEquals(result.size(), 1);
        assertEquals(result.get(0), dto);
    }

}
