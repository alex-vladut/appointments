package com.comp.appointments.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

public class AppointmentTest {

    @Test
    public void shouldCreateAppointment() {
        final var title = "My appointment";
        final var interval = mock(Interval.class);

        final var appointment = Appointment.create(title, interval);

        assertNotNull(appointment);
        assertEquals(appointment.interval(), interval);
        assertEquals(appointment.title(), title);
    }

    @Test
    public void shouldCancelAppointment() {
        final var title = "My appointment";
        final var interval = mock(Interval.class);
        final var appointment = Appointment.create(title, interval);

        appointment.cancel();

        assertEquals(Status.CANCELLED, appointment.status());
    }


    @Test
    public void shouldNotCancelAppointment_withAppointmentAlreadyCancelled() {
        final var title = "My appointment";
        final var interval = mock(Interval.class);
        final var appointment = Appointment.create(title, interval);
        appointment.cancel();

        assertThrows(IllegalStateException.class, appointment::cancel);
    }
}
