package com.comp.appointments.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GetAppointmentsResponse {
    private List<AppointmentDto> data;
}
