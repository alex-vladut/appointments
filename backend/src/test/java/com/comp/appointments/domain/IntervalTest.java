package com.comp.appointments.domain;

import org.junit.jupiter.api.Test;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;

import static org.junit.jupiter.api.Assertions.*;

public class IntervalTest {

    @Test
    public void shouldCreateInterval_withOneHourDuration() {
        final ZonedDateTime start = ZonedDateTime.now().plusHours(1);
        final ZonedDateTime end = start.plusHours(1);

        final var interval = Interval.create(start, end);

        assertNotNull(interval);
        assertEquals(interval.start(), start.truncatedTo(ChronoUnit.MINUTES));
        assertEquals(interval.end(), end.truncatedTo(ChronoUnit.MINUTES));
    }

    @Test
    public void shouldCreateInterval_with15MinutesDuration() {
        final ZonedDateTime start = ZonedDateTime.now().plusHours(1);
        final ZonedDateTime end = start.plusMinutes(15);

        final var interval = Interval.create(start, end);

        assertNotNull(interval);
        assertEquals(interval.start(), start.truncatedTo(ChronoUnit.MINUTES));
        assertEquals(interval.end(), end.truncatedTo(ChronoUnit.MINUTES));
    }

    @Test
    public void shouldNotCreateInterval_withEndTimeBeforeStartTime() {
        final ZonedDateTime start = ZonedDateTime.now().plusHours(1);
        final ZonedDateTime end = start.minusMinutes(15);

        assertThrows(IllegalArgumentException.class, () -> Interval.create(start, end));
    }

    @Test
    public void shouldNotCreateInterval_withStartTimeInThePast() {
        final ZonedDateTime start = ZonedDateTime.now().minusHours(4);
        final ZonedDateTime end = start.minusMinutes(15);

        assertThrows(IllegalArgumentException.class, () -> Interval.create(start, end));
    }

    @Test
    public void shouldNotCreateInterval_withWrongDuration() {
        final ZonedDateTime start = ZonedDateTime.now().plusHours(1);
        final ZonedDateTime end = start.plusHours(5);

        assertThrows(IllegalArgumentException.class, () -> Interval.create(start, end));
    }
}
