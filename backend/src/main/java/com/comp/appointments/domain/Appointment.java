package com.comp.appointments.domain;

import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@NoArgsConstructor
public class Appointment {
    @Id
    private UUID id;
    @Column
    private String title;
    @Column(name = "start_date_time")
    private ZonedDateTime start;
    @Column(name = "end_date_time")
    private ZonedDateTime end;

    private Appointment(final UUID id, final String title, final ZonedDateTime start, final ZonedDateTime end) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
    }

    public UUID id() {
        return id;
    }

    public String title() {
        return title;
    }

    public ZonedDateTime start() {
        return start;
    }

    public ZonedDateTime end() {
        return end;
    }

    public static Appointment create(@NonNull final String title, @NonNull final ZonedDateTime start, @NonNull final ZonedDateTime end) {
        if (start.isAfter(end)) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        final Duration duration = Duration.between(start, end);
        if (!duration.equals(Duration.ofMinutes(15)) && !duration.equals(Duration.ofHours(1))) {
            throw new IllegalArgumentException("Appointment duration can be 15 minutes or 1 hour");
        }
        return new Appointment(UUID.randomUUID(), title, start, end);
    }
}
