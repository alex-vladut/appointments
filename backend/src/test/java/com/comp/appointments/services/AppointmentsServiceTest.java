package com.comp.appointments.services;

import com.comp.appointments.domain.BookedAppointment;
import com.comp.appointments.domain.CancelledAppointment;
import com.comp.appointments.dtos.AppointmentDto;
import com.comp.appointments.dtos.CreateAppointmentRequest;
import com.comp.appointments.exceptions.EntityNotFoundException;
import com.comp.appointments.repositories.BookedAppointmentsRepository;
import com.comp.appointments.repositories.CancelledAppointmentsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static com.comp.appointments.utils.DateTimeGenerator.nextBusinessDay;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AppointmentsServiceTest {

    @Mock
    private BookedAppointmentsRepository bookedRepository;
    @Mock
    private CancelledAppointmentsRepository cancelledRepository;
    @Mock
    private DomainToDtoMapper mapper;

    private AppointmentsService service;

    @BeforeEach
    public void setUp() {
        service = new AppointmentsService(bookedRepository, cancelledRepository, mapper);
    }

    @Test
    public void shouldCreateAppointment() {
        final var start = nextBusinessDay().withHour(12);
        final var end = start.plusHours(1);
        final var request = new CreateAppointmentRequest("My appointment", start, end);

        final var captor = ArgumentCaptor.forClass(BookedAppointment.class);
        when(bookedRepository.overlapping(request.getStart(), request.getEnd())).thenReturn(false);

        final UUID id = service.create(request);

        verify(bookedRepository).save(captor.capture());
        assertEquals(captor.getValue().id(), id);
        assertNotNull(captor.getValue().interval());
        assertEquals(captor.getValue().interval().start(), request.getStart());
        assertEquals(captor.getValue().interval().end(), request.getEnd());
    }

    @Test
    public void shouldNotCreateAppointment_withAppointmentExistingForInterval() {
        final var start = nextBusinessDay().withHour(12);
        final var end = start.plusHours(1);
        final var request = new CreateAppointmentRequest("My appointment", start, end);

        when(bookedRepository.overlapping(request.getStart(), request.getEnd())).thenReturn(true);

        assertThrows(IllegalStateException.class, () -> service.create(request));
    }

    @Test
    public void shouldFindAllAppointments() {
        final var from = ZonedDateTime.now().minusDays(5);
        final var to = ZonedDateTime.now().plusDays(5);
        final var appointment = mock(BookedAppointment.class);
        final var dto = mock(AppointmentDto.class);

        when(bookedRepository.findAllBetween(from, to)).thenReturn(Collections.singletonList(appointment));
        when(mapper.map(appointment)).thenReturn(dto);

        final var result = service.findAll(from, to);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(dto, result.get(0));
    }

    @Test
    public void shouldCancelAppointment() {
        final var appointmentId = UUID.randomUUID();
        final var appointment = mock(BookedAppointment.class);
        final var cancelledAppointment = mock(CancelledAppointment.class);

        when(bookedRepository.findById(appointmentId)).thenReturn(Optional.of(appointment));
        when(appointment.cancel()).thenReturn(cancelledAppointment);

        service.cancel(appointmentId);

        verify(appointment).cancel();
        verify(cancelledRepository).save(cancelledAppointment);
    }

    @Test
    public void shouldNotCancelAppointment_withEntityNotFound() {
        final var appointmentId = UUID.randomUUID();

        when(bookedRepository.findById(appointmentId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> service.cancel(appointmentId));
    }

}
