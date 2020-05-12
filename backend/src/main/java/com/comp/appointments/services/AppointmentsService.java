package com.comp.appointments.services;

import com.comp.appointments.domain.Appointment;
import com.comp.appointments.domain.WorkingTime;
import com.comp.appointments.dtos.CreateAppointmentRequest;
import com.comp.appointments.repositories.AppointmentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppointmentsService {
    private final AppointmentsRepository repository;

    @Transactional
    public UUID create(final CreateAppointmentRequest request) {
        final var overlapping = repository.overlapping(request.start, request.end);
        if (overlapping != null && overlapping > 0) {
            throw new IllegalStateException("There is already an appointment booked for the selected time interval");
        }
        final var interval = new WorkingTime().createInterval(request.start, request.end);
        final var appointment = Appointment.create(request.title, interval);
        repository.save(appointment);
        return appointment.id();
    }
}
