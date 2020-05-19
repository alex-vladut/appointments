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

import javax.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
public class AppointmentsService {
    private final BookedAppointmentsRepository bookedRepository;
    private final CancelledAppointmentsRepository cancelledRepository;
    private final DomainToDtoMapper mapper;

    @Transactional
    public UUID create(final CreateAppointmentRequest request) {
        final var interval = new WorkingTime().createInterval(request.getStart(), request.getEnd());
        final var overlapping = bookedRepository.overlapping(interval.start(), interval.end());
        if (overlapping != null && overlapping > 0) {
            throw new IllegalStateException("There is already an appointment booked for the selected time interval");
        }
        final var appointment = Appointment.create(request.getTitle(), interval);
        bookedRepository.save(appointment);
        return appointment.id();
    }

    public List<AppointmentDto> findAll(final ZonedDateTime from, final ZonedDateTime to) {
        final var result = bookedRepository.findAllBetween(from, to);
        return result.stream().map(mapper::map).collect(toList());
    }

    @Transactional
    public void cancel(final UUID id) {
        final var appointment = bookedRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No appointment found with the given ID."));
        final var cancelledAppointment = appointment.cancel();
        bookedRepository.delete(appointment);
        cancelledRepository.save(cancelledAppointment);
    }
}
