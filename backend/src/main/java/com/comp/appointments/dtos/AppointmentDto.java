package com.comp.appointments.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class AppointmentDto {
    private UUID id;
    private String title;
    private ZonedDateTime start;
    private ZonedDateTime end;
}
