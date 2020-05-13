import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromCalendar from './calendar.reducer';
import * as CalendarActions from './calendar.actions';

@Injectable()
export class CalendarEffects {
  loadCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalendarActions.loadCalendar),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CalendarActions.loadCalendarSuccess({ calendar: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CalendarActions.loadCalendarFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
