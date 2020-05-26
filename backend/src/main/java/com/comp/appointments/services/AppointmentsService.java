package com.comp.appointments.services;

import com.comp.appointments.domain.Appointment;
import com.comp.appointments.domain.WorkingTime;
import com.comp.appointments.dtos.AppointmentDto;
import com.comp.appointments.dtos.CreateAppointmentRequest;
import com.comp.appointments.exceptions.EntityNotFoundException;
import com.comp.appointments.repositories.BookedAppointmentsRepository;
import com.comp.appointments.repositories.CancelledAppointmentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
@Transactional
public class AppointmentsService {
    private final BookedAppointmentsRepository bookedRepository;
    private final CancelledAppointmentsRepository cancelledRepository;
    private final DomainToDtoMapper mapper;

    public UUID create(final CreateAppointmentRequest request) {
        final var interval = new WorkingTime().createInterval(request.getStart(), request.getEnd());
        final var overlapping = bookedRepository.overlapping(interval.start(), interval.end());
        if (Boolean.TRUE.equals(overlapping)) {
            throw new IllegalStateException("There is already an appointment booked for the selected time interval");
        }
        final var appointment = Appointment.create(request.getTitle(), interval);
        bookedRepository.save(appointment);
        return appointment.id();
    }

    @Transactional(readOnly = true)
    public List<AppointmentDto> findAll(final ZonedDateTime from, final ZonedDateTime to) {
        return bookedRepository.findAllBetween(from, to).stream().map(mapper::map).collect(toList());
    }

    public void cancel(final UUID id) {
        final var appointment = bookedRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No appointment found with the given ID."));
        final var cancelledAppointment = appointment.cancel();
        bookedRepository.delete(appointment);
        cancelledRepository.save(cancelledAppointment);
    }
}
