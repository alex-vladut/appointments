import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as CalendarActions from './calendar.actions';
import * as fromCalendar from './calendar.reducer';
import * as CalendarSelectors from './calendar.selectors';

@Injectable({ providedIn: 'root' })
export class CalendarFacade {
  allAppointments$ = this.store.pipe(
    select(CalendarSelectors.getAllAppointments)
  );
  selectedAppointment$ = this.store.pipe(
    select(CalendarSelectors.getSelectedAppointment)
  );
  weekDays$ = this.store.pipe(select(CalendarSelectors.getWeekDays));
  isCreateAppointmentOpen$ = this.store.pipe(
    select(CalendarSelectors.getCreateAppointmentOpen)
  );
  isViewAppointmentOpen$ = this.store.pipe(
    select(CalendarSelectors.getViewAppointmentOpen)
  );
  createState$ = this.store.pipe(select(CalendarSelectors.getCreateState));
  cancelState$ = this.store.pipe(select(CalendarSelectors.getCancelState));

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

  openViewAppointment(id: string) {
    this.store.dispatch(CalendarActions.OpenViewAppointment({ id }));
  }

  closeViewAppointment() {
    this.store.dispatch(CalendarActions.CloseViewAppointment());
  }

  createAppointment(appointment: any) {
    this.store.dispatch(CalendarActions.CreateAppointment({ appointment }));
  }

  cancelAppointment(id: string) {
    this.store.dispatch(CalendarActions.CancelAppointment({ id }));
  }

  nextWeek() {
    this.store.dispatch(CalendarActions.NextWeek());
  }

  previousWeek() {
    this.store.dispatch(CalendarActions.PreviousWeek());
  }
}
