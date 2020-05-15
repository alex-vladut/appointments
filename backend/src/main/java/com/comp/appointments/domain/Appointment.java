package com.comp.appointments.domain;

import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.UUID;

@Entity
@NoArgsConstructor
public class Appointment {
    @Id
    private UUID id;
    @Column
    private String title;
    private Interval interval;
    @Enumerated
    private Status status;

    private Appointment(final UUID id, final String title, final Interval interval) {
        this.id = id;
        this.title = title;
        this.interval = interval;
        this.status = Status.BOOKED;
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

    public Status status() {
        return status;
    }

    public void cancel() {
        if (status == Status.CANCELLED) {
            throw new IllegalStateException("Appointment is already cancelled");
        }
        status = Status.CANCELLED;
    }

    public static Appointment create(@NonNull final String title, @NonNull final Interval interval) {
        return new Appointment(UUID.randomUUID(), title, interval);
    }
}
