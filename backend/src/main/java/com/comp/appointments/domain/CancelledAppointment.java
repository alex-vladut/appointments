package com.comp.appointments.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("cancelled")
public class CancelledAppointment extends Appointment {

    /**
     * Constructor required by JPA
     */
    protected CancelledAppointment() {
    }

    CancelledAppointment(final BookedAppointment appointment) {
        super(appointment.id(), appointment.title(), appointment.interval());
    }
}
