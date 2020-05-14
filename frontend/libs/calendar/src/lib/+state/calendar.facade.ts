import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as CalendarActions from './calendar.actions';
import * as fromCalendar from './calendar.reducer';
import * as CalendarSelectors from './calendar.selectors';

@Injectable({ providedIn: 'root' })
export class CalendarFacade {
  loaded$ = this.store.pipe(select(CalendarSelectors.getLoaded));
  error$ = this.store.pipe(select(CalendarSelectors.getError));
  allAppointments$ = this.store.pipe(
    select(CalendarSelectors.getAllAppointments)
  );
  selectedAppointment$ = this.store.pipe(select(CalendarSelectors.getSelected));
  weekDays$ = this.store.pipe(select(CalendarSelectors.getWeekDays));
  isCreateAppointmentOpen$ = this.store.pipe(
    select(CalendarSelectors.getCreateAppointmentOpen)
  );

  constructor(
    private readonly store: Store<fromCalendar.CalendarPartialState>
  ) {}

  loadAppointments() {
    this.store.dispatch(CalendarActions.LoadAppointments());
  }

  openCreateAppointment() {
    this.store.dispatch(CalendarActions.OpenCreateAppointment());
  }

  closeCreateAppointment() {
    this.store.dispatch(CalendarActions.CloseCreateAppointment());
  }

  createAppointment(appointment: any) {
    this.store.dispatch(CalendarActions.CreateAppointment({ appointment }));
  }

  nextWeek() {
    this.store.dispatch(CalendarActions.NextWeek());
  }

  previousWeek() {
    this.store.dispatch(CalendarActions.PreviousWeek());
  }
}
