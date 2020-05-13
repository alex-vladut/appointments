package com.comp.appointments.domain;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.Arrays;

@Embeddable
@NoArgsConstructor
@EqualsAndHashCode
public class Interval {
    @Column(name = "start_date_time")
    private ZonedDateTime start;
    @Column(name = "end_date_time")
    private ZonedDateTime end;

    private Interval(final ZonedDateTime start, final ZonedDateTime end) {
        this.start = start;
        this.end = end;
    }

    public ZonedDateTime start() {
        return start;
    }

    public ZonedDateTime end() {
        return end;
    }

    public static Interval create(@NonNull final ZonedDateTime start, @NonNull final ZonedDateTime end) {
        if (start.isAfter(end)) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        if (start.isBefore(ZonedDateTime.now())) {
            throw new IllegalArgumentException("An appointment cannot be booked in the past");
        }
        final var duration = Duration.between(start, end);
        if (!Arrays.asList(Duration.ofMinutes(15), Duration.ofHours(1)).contains(duration)) {
            throw new IllegalArgumentException("Appointment duration can be 15 minutes or 1 hour");
        }
        return new Interval(start, end);
    }
}
