package com.comp.appointments.domain;

import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@NoArgsConstructor
public class Appointment {
    @Id
    private UUID id;
    @Column
    private String title;
    private Interval interval;

    private Appointment(final UUID id, final String title, final Interval interval) {
        this.id = id;
        this.title = title;
        this.interval = interval;
    }

    public UUID id() {
        return id;
    }

    public String title() {
        return title;
    }

    public Interval interval() {
        return interval;
    }

    public static Appointment create(@NonNull final String title, @NonNull final Interval interval) {
        return new Appointment(UUID.randomUUID(), title, interval);
    }
}
