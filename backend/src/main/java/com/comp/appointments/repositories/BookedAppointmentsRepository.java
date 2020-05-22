package com.comp.appointments.repositories;

import com.comp.appointments.domain.BookedAppointment;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookedAppointmentsRepository extends CrudRepository<BookedAppointment, UUID> {
    @Query("select case when (count(a.id) > 0) then true else false end" +
            " from BookedAppointment a where" +
            "  (:start >= a.interval.start and :start < a.interval.end) or" +
            "  (:end > a.interval.start and :end <= a.interval.end) or" +
            "  (a.interval.start >= :start and a.interval.end <= :end)" +
            " group by a.id")
    Boolean overlapping(@Param("start") ZonedDateTime start, @Param("end") ZonedDateTime end);

    @Query("select a from BookedAppointment a where a.interval.start between :from and :to")
    List<BookedAppointment> findAllBetween(@Param("from") ZonedDateTime from, @Param("to") ZonedDateTime to);

    @Modifying
    @Query(value = "insert into appointment (id, title, start_date_time, end_date_time, version)" +
            " select :#{#appointment.id()}, :#{#appointment.title()}, :#{#appointment.interval().start()}, :#{#appointment.interval().end()}, :#{#appointment.version()}" +
            " where not exists" +
            " (" +
            " select 1" +
            " from appointment a where" +
            "  (:#{#appointment.interval().start()} >= a.start_date_time and :#{#appointment.interval().start()} < a.end_date_time) or" +
            "  (:#{#appointment.interval().end()} > a.start_date_time and :#{#appointment.interval().end()} <= a.end_date_time) or" +
            "  (a.start_date_time >= :#{#appointment.interval().start()} and a.end_date_time <= :#{#appointment.interval().end()})" +
            " )", nativeQuery = true)
    void create(@Param("appointment") BookedAppointment appointment);
}
