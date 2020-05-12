package com.comp.appointments.repositories;

import com.comp.appointments.domain.Appointment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.UUID;

@Repository
public interface AppointmentsRepository extends CrudRepository<Appointment, UUID> {
    @Query("select count(a.id)" +
            " from Appointment a where" +
            " :start between a.interval.start and a.interval.end or" +
            " :end between a.interval.start and a.interval.end or" +
            " a.interval.start between :start and :end or" +
            " a.interval.end between :start and :end" +
            " group by a.id")
    Integer overlapping(@Param("start") ZonedDateTime start, @Param("end") ZonedDateTime end);
}
