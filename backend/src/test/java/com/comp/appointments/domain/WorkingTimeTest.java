package com.comp.appointments.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static com.comp.appointments.utils.DateTimeGenerator.nextBusinessDay;
import static com.comp.appointments.utils.DateTimeGenerator.nextWeekendDay;
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
        final var start = nextBusinessDay().withHour(9);
        final var end = start.plusHours(1);

        final var interval = workingTime.createInterval(start, end);

        assertEquals(interval.start(), start);
        assertEquals(interval.end(), end);
    }

    @Test
    public void shouldCreateInterval_withStartOutsideWorkingHours() {
        final var start = nextBusinessDay().withHour(23);
        final var end = start.plusHours(1);

        assertThrows(IllegalArgumentException.class, () -> workingTime.createInterval(start, end));
    }

    @Test
    public void shouldCreateInterval_withStartWeekendDay() {
        final var start = nextWeekendDay().withHour(12);
        final var end = start.plusMinutes(15);

        assertThrows(IllegalArgumentException.class, () -> workingTime.createInterval(start, end));
    }
}
