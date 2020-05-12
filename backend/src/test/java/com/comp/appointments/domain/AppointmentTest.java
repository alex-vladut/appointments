package com.comp.appointments.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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

}
