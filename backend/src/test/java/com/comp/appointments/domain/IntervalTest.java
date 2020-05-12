package com.comp.appointments.domain;

import org.junit.jupiter.api.Test;

import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class IntervalTest {

    @Test
    public void shouldCreateInterval_withOneHourDuration() {
        final ZonedDateTime start = ZonedDateTime.now();
        final ZonedDateTime end = start.plusHours(1);

        final var interval = Interval.create(start, end);

        assertNotNull(interval);
        assertEquals(interval.start(), start);
        assertEquals(interval.end(), end);
    }

    @Test
    public void shouldCreateInterval_with15MinutesDuration() {
        final ZonedDateTime start = ZonedDateTime.now();
        final ZonedDateTime end = start.plusMinutes(15);

        final var interval = Interval.create(start, end);

        assertNotNull(interval);
        assertEquals(interval.start(), start);
        assertEquals(interval.end(), end);
    }

    @Test
    public void shouldNotCreateInterval_withEndTimeBeforeStartTime() {
        final ZonedDateTime start = ZonedDateTime.now();
        final ZonedDateTime end = start.minusMinutes(15);

        assertThrows(IllegalArgumentException.class, () -> Interval.create(start, end));
    }

    @Test
    public void shouldNotCreateInterval_withWrongDuration() {
        final ZonedDateTime start = ZonedDateTime.now();
        final ZonedDateTime end = start.plusHours(5);

        assertThrows(IllegalArgumentException.class, () -> Interval.create(start, end));
    }
}
