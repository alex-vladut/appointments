package com.comp.appointments.services;

import com.comp.appointments.domain.Appointment;
import com.comp.appointments.dtos.AppointmentDto;
import org.springframework.stereotype.Component;

@Component
public class DomainToDtoMapper {

    public AppointmentDto map(final Appointment appointment) {
        return new AppointmentDto(appointment.id(), appointment.title(), appointment.interval().start(), appointment.interval().end());
    }
}
