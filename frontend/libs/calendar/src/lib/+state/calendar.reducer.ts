import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CalendarActions from './calendar.actions';
import { AppointmentEntity } from './calendar.models';

export const CALENDAR_FEATURE_KEY = 'calendar';

export interface State extends EntityState<AppointmentEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface CalendarPartialState {
  readonly [CALENDAR_FEATURE_KEY]: State;
}

export const calendarAdapter: EntityAdapter<AppointmentEntity> = createEntityAdapter<
  AppointmentEntity
>();

export const initialState: State = calendarAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const calendarReducer = createReducer(
  initialState,
  on(CalendarActions.LoadAppointments, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(CalendarActions.LoadAppointmentsSuccess, (state, { data }) =>
    calendarAdapter.setAll(data, { ...state, loaded: true })
  ),
  on(CalendarActions.LoadAppointmentsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return calendarReducer(state, action);
}
