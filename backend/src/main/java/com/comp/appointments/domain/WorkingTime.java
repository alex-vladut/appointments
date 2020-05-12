package com.comp.appointments.domain;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * Domain object modeling the working days and hours between which it is allowed to book appointments.
 * Currently the values are hardcoded, but later could be configured.
 */
public class WorkingTime {
    private final List<DayOfWeek> workingDays = Arrays.asList(DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY);
    private final ZoneOffset timezone = ZoneOffset.UTC;

    public Interval createInterval(final ZonedDateTime start, final ZonedDateTime end) {
        final var interval = Interval.create(start, end);
        if (!isInWorkingDaysInterval(interval)) {
            throw new IllegalArgumentException("Appointments can only be booked during working hours of the day ");
        }
        return interval;
    }

    private boolean isInWorkingDaysInterval(final Interval interval) {
        final LocalDateTime startLocal = LocalDateTime.ofInstant(interval.start().toInstant(), timezone);
        final LocalDateTime endLocal = LocalDateTime.ofInstant(interval.end().toInstant(), timezone);

        return workingDays.contains(startLocal.getDayOfWeek()) && workingDays.contains(endLocal.getDayOfWeek())
                && isInWorkingHours(startLocal) && isInWorkingHours(endLocal);
    }

    private boolean isInWorkingHours(final LocalDateTime dateTime) {
        return dateTime.getHour() >= 9 && dateTime.getHour() <= 18;
    }
}
