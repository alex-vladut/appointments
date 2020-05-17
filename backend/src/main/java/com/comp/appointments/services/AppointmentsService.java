package com.comp.appointments.services;

import com.comp.appointments.domain.Appointment;
import com.comp.appointments.domain.WorkingTime;
import com.comp.appointments.dtos.AppointmentDto;
import com.comp.appointments.dtos.CreateAppointmentRequest;
import com.comp.appointments.exceptions.EntityNotFoundException;
import com.comp.appointments.repositories.AppointmentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
public class AppointmentsService {
    private final AppointmentsRepository repository;
    private final DomainToDtoMapper mapper;

    @Transactional
    public UUID create(final CreateAppointmentRequest request) {
        final var interval = new WorkingTime().createInterval(request.getStart(), request.getEnd());
        final var overlapping = repository.overlapping(interval.start(), interval.end());
        if (overlapping != null && overlapping > 0) {
            throw new IllegalStateException("There is already an appointment booked for the selected time interval");
        }
        final var appointment = Appointment.create(request.getTitle(), interval);
        repository.save(appointment);
        return appointment.id();
    }

    public List<AppointmentDto> findAll(final ZonedDateTime from, final ZonedDateTime to) {
        final var result = repository.findAllBetween(from, to);
        return result.stream().map(mapper::map).collect(toList());
    }

    @Transactional
    public void cancel(final UUID id) {
        final var appointment = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No appointment found with the given ID."));
        appointment.cancel();
        repository.save(appointment);
    }
}
