package com.comp.appointments.repositories;

import com.comp.appointments.domain.CancelledAppointment;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface CancelledAppointmentsRepository extends CrudRepository<CancelledAppointment, UUID> {
}
