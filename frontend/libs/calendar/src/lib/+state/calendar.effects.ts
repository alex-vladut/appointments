import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { withLatestFrom, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as CalendarActions from './calendar.actions';
import { CalendarApi } from './calendar.api';
import * as CalendarSelectors from './calendar.selectors';
import * as fromCalendar from './calendar.reducer';
import { addDays, endOfDay, startOfDay } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class CalendarEffects {
  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CalendarActions.LoadAppointments,
        CalendarActions.NextWeek,
        CalendarActions.PreviousWeek
      ),
      withLatestFrom(this.store.pipe(select(CalendarSelectors.getStartDate))),
      fetch({
        run: (_, startDate) =>
          this.api
            .fetch(startOfDay(startDate), endOfDay(addDays(startDate, 6)))
            .pipe(
              map(({ data }) =>
                CalendarActions.LoadAppointmentsSuccess({
                  data: data.map(entity => ({
                    ...entity,
                    start: new Date(entity.start),
                    end: new Date(entity.end)
                  }))
                })
              )
            ),

        onError: (_, error) => {
          console.error('Error', error);
          return CalendarActions.LoadAppointmentsFailure({ error });
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
