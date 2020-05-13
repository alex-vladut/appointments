import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import {
  LoadAppointments,
  LoadAppointmentsSuccess,
  LoadAppointmentsFailure
} from './calendar.actions';
import { addHours } from 'date-fns';

const dummyData = [
  {
    id: '1',
    title: 'Appointment 1',
    start: new Date(),
    end: addHours(new Date(), 1)
  }
];

@Injectable({ providedIn: 'root' })
export class CalendarEffects {
  loadCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAppointments),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return LoadAppointmentsSuccess({ data: dummyData });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return LoadAppointmentsFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
