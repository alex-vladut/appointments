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
    @Version
    private Integer version;

    /**
     * Constructor required by JPA
     */
    protected Appointment() {
    }

    protected Appointment(final UUID id, final String title, final Interval interval) {
        this.id = id;
        this.title = title;
        this.interval = interval;
        this.version = 0;
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

    public Integer version() {
        return version;
    }

    public static BookedAppointment create(@NonNull final String title, @NonNull final Interval interval) {
        return new BookedAppointment(UUID.randomUUID(), title, interval);
    }
}
