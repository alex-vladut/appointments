package com.comp.appointments.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
public class CreateAppointmentRequest {

    @NotNull
    @Size(min = 3, max = 200)
    private String title;

    @NotNull
    @Future
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime start;

    @NotNull
    @Future
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime end;
}
