package com.comp.appointments.domain;

import lombok.NonNull;

import javax.persistence.*;
import java.util.UUID;

@Entity
public abstract class Appointment {
    @Id
    private UUID id;
    @Column
    private String title;
    private Interval interval;

    /**
     * Constructor required by JPA
     */
    protected Appointment() {
    }

    protected Appointment(final UUID id, final String title, final Interval interval) {
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

    public static BookedAppointment create(@NonNull final String title, @NonNull final Interval interval) {
        return new BookedAppointment(UUID.randomUUID(), title, interval);
    }
}
