package com.comp.appointments.utils;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

public final class DateTimeGenerator {
    private DateTimeGenerator() {
        throw new IllegalStateException("Cannot instantiate utility class");
    }

    private static final List<DayOfWeek> WEEKEND_DAYS = Arrays.asList(DayOfWeek.SATURDAY, DayOfWeek.SUNDAY);

    public static ZonedDateTime nextBusinessDay() {
        var result = LocalDate.now().atStartOfDay(ZoneId.of("UTC")).plusDays(1);
        while (WEEKEND_DAYS.contains(result.getDayOfWeek())) {
            result = result.plusDays(1);
        }
        return result;
    }

    public static ZonedDateTime nextWeekendDay() {
        var result = LocalDate.now().atStartOfDay(ZoneId.of("UTC")).plusDays(1);
        while (!WEEKEND_DAYS.contains(result.getDayOfWeek())) {
            result = result.plusDays(1);
        }
        return result;
    }
}
