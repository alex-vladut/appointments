package com.comp.appointments.domain;

import org.junit.jupiter.api.Test;

import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class AppointmentTest {

    @Test
    public void shouldCreateAppointment_withOneHourDuration() {
        final String title = "My appointment";
        final ZonedDateTime start = ZonedDateTime.now();
        final ZonedDateTime end = start.plusHours(1);

        final Appointment appointment = Appointment.create(title, start, end);

        assertNotNull(appointment);
        assertEquals(appointment.start(), start);
        assertEquals(appointment.end(), end);
    }

    @Test
    public void shouldCreateAppointment_with15MinutesDuration() {
        final String title = "My appointment";
        final ZonedDateTime start = ZonedDateTime.now();
        final ZonedDateTime end = start.plusMinutes(15);

        final Appointment appointment = Appointment.create(title, start, end);

        assertNotNull(appointment);
        assertEquals(appointment.start(), start);
        assertEquals(appointment.end(), end);
    }

    @Test
    public void shouldNotCreateAppointment_withEndTimeBeforeStartTime() {
        final String title = "My appointment";
        final ZonedDateTime start = ZonedDateTime.now();
        final ZonedDateTime end = start.minusMinutes(15);

        assertThrows(IllegalArgumentException.class, () -> Appointment.create(title, start, end));
    }

    @Test
    public void shouldNotCreateAppointment_withWrongDuration() {
        final String title = "My appointment";
        final ZonedDateTime start = ZonedDateTime.now();
        final ZonedDateTime end = start.plusHours(5);

        assertThrows(IllegalArgumentException.class, () -> Appointment.create(title, start, end));
    }
}
