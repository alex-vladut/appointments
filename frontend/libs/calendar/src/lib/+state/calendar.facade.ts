import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as CalendarActions from './calendar.actions';
import * as fromCalendar from './calendar.reducer';
import * as CalendarSelectors from './calendar.selectors';

@Injectable({ providedIn: 'root' })
export class CalendarFacade {
  loaded$ = this.store.pipe(select(CalendarSelectors.getLoaded));
  allAppointments$ = this.store.pipe(
    select(CalendarSelectors.getAllAppointments)
  );
  selectedAppointment$ = this.store.pipe(select(CalendarSelectors.getSelected));
  weekDays$ = this.store.pipe(select(CalendarSelectors.getWeekDays));

  constructor(
    private readonly store: Store<fromCalendar.CalendarPartialState>
  ) {}

  loadAppointments() {
    this.store.dispatch(CalendarActions.LoadAppointments());
  }

  nextWeek() {
    this.store.dispatch(CalendarActions.NextWeek());
  }

  previousWeek() {
    this.store.dispatch(CalendarActions.PreviousWeek());
  }
}
