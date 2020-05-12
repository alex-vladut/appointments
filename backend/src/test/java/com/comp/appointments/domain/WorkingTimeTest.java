package com.comp.appointments.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class WorkingTimeTest {
    private WorkingTime workingTime;

    @BeforeEach
    public void setUp() {
        workingTime = new WorkingTime();
    }

    @Test
    public void shouldCreateInterval_withStartAndEndBetweenWorkingHours() {
        final var start = ZonedDateTime.now().withHour(12);
        final var end = start.plusHours(1);

        final var interval = workingTime.createInterval(start, end);

        assertEquals(interval.start(), start);
        assertEquals(interval.end(), end);
    }

    @Test
    public void shouldCreateInterval_withStartOutsideWorkingHours() {
        final var start = ZonedDateTime.now().withHour(23);
        final var end = start.plusHours(1);

        assertThrows(IllegalArgumentException.class, () -> workingTime.createInterval(start, end));
    }
}
