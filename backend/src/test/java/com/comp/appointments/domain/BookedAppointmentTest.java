package com.comp.appointments.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

public class BookedAppointmentTest {

    @Test
    public void shouldCancelAppointment() {
        final var title = "My appointment";
        final var interval = mock(Interval.class);
        final var appointment = Appointment.create(title, interval);

        final var cancelledAppointment = appointment.cancel();

        assertNotNull(cancelledAppointment);
        assertEquals(appointment.id(), cancelledAppointment.id());
        assertEquals(title, cancelledAppointment.title());
        assertEquals(interval, cancelledAppointment.interval());
    }
}
