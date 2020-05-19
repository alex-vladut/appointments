package com.comp.appointments.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.UUID;

@Entity
@DiscriminatorValue("booked")
public class BookedAppointment extends Appointment {

    /**
     * Constructor required by JPA
     */
    protected BookedAppointment() {
    }

    BookedAppointment(final UUID id, final String title, final Interval interval) {
        super(id, title, interval);
    }

    public CancelledAppointment cancel() {
        return new CancelledAppointment(this);
    }
}
