import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { withLatestFrom, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as CalendarActions from './calendar.actions';
import { CalendarApi } from './calendar.api';
import * as CalendarSelectors from './calendar.selectors';
import * as fromCalendar from './calendar.reducer';
import {
  addDays,
  endOfDay,
  startOfDay,
  addMinutes,
  differenceInMinutes
} from 'date-fns';

@Injectable({ providedIn: 'root' })
export class CalendarEffects {
  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CalendarActions.LoadAppointments,
        CalendarActions.NextWeek,
        CalendarActions.PreviousWeek,
        CalendarActions.CreateAppointmentSuccess,
        CalendarActions.CancelAppointmentSuccess
      ),
      withLatestFrom(this.store.pipe(select(CalendarSelectors.getStartDate))),
      fetch({
        run: (_, startDate) =>
          this.api
            .fetch(startOfDay(startDate), endOfDay(addDays(startDate, 6)))
            .pipe(
              map(({ data }) =>
                CalendarActions.LoadAppointmentsSuccess({
                  data: data.map(mapToEntity)
                })
              )
            ),

        onError: (_, error) => {
          console.error('Error', error);
          return CalendarActions.LoadAppointmentsFailure({
            error: error.error
          });
        }
      })
    )
  );

  createAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.CreateAppointment),
      pessimisticUpdate({
        run: action =>
          this.api
            .create(buildAppointment(action.appointment))
            .pipe(map(() => CalendarActions.CreateAppointmentSuccess())),
        onError: (_, error) => {
          console.error('Error', error);
          return CalendarActions.CreateAppointmentFailure({
            error: error.error
          });
        }
      })
    )
  );

  cancelAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.CancelAppointment),
      pessimisticUpdate({
        run: action =>
          this.api
            .cancel(action.id)
            .pipe(map(() => CalendarActions.CancelAppointmentSuccess())),
        onError: (_, error) => {
          console.error('Error', error);
          return CalendarActions.CancelAppointmentFailure({
            error: error.error
          });
        }
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly api: CalendarApi,
    private readonly store: Store<fromCalendar.CalendarPartialState>
  ) {}
}

const buildAppointment = (appointment: any) => ({
  title: appointment.title,
  start: (appointment.date as Date).toISOString(),
  end: addMinutes(appointment.date, appointment.duration).toISOString()
});

const mapToEntity = (item: any) => ({
  ...item,
  start: new Date(item.start),
  end: new Date(item.end),
  duration: differenceInMinutes(new Date(item.end), new Date(item.start))
});
