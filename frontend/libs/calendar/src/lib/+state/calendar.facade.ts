import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { LoadAppointments } from './calendar.actions';
import * as fromCalendar from './calendar.reducer';
import * as CalendarSelectors from './calendar.selectors';

@Injectable({ providedIn: 'root' })
export class CalendarFacade {
  loaded$ = this.store.pipe(select(CalendarSelectors.getLoaded));
  allAppointments$ = this.store.pipe(
    select(CalendarSelectors.getAllAppointments)
  );
  selectedAppointment$ = this.store.pipe(select(CalendarSelectors.getSelected));

  constructor(
    private readonly store: Store<fromCalendar.CalendarPartialState>
  ) {}

  loadAppointments() {
    this.store.dispatch(LoadAppointments());
  }
}
