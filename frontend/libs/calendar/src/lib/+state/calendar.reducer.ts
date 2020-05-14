import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { startOfWeek, startOfDay, addWeeks, subWeeks } from 'date-fns';

import * as CalendarActions from './calendar.actions';
import { AppointmentEntity, WeekDayEntity } from './calendar.models';
import { createWeekDays } from '../utils';

export const CALENDAR_FEATURE_KEY = 'calendar';

export type ApiState = 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';

export interface State extends EntityState<AppointmentEntity> {
  selectedId?: string | number;
  loaded: boolean;
  createState: ApiState;
  error?: string | null;
  startDate: Date;
  weekDays: WeekDayEntity[];
  isCreateAppointmentOpen: boolean;
}

export interface CalendarPartialState {
  readonly [CALENDAR_FEATURE_KEY]: State;
}

export const calendarAdapter: EntityAdapter<AppointmentEntity> = createEntityAdapter<
  AppointmentEntity
>();

const firstDayOfWeek = startOfDay(startOfWeek(new Date()));

export const initialState: State = calendarAdapter.getInitialState({
  startDate: firstDayOfWeek,
  weekDays: createWeekDays(firstDayOfWeek),
  createState: 'INIT',
  loaded: false,
  isCreateAppointmentOpen: false
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
  })),
  on(CalendarActions.NextWeek, state => {
    const newFirstWeekDay = addWeeks(state.startDate, 1);
    return {
      ...state,
      startDate: newFirstWeekDay,
      weekDays: createWeekDays(newFirstWeekDay)
    };
  }),
  on(CalendarActions.PreviousWeek, state => {
    const newFirstWeekDay = subWeeks(state.startDate, 1);
    return {
      ...state,
      startDate: newFirstWeekDay,
      weekDays: createWeekDays(newFirstWeekDay)
    };
  }),
  on(CalendarActions.OpenCreateAppointment, state => ({
    ...state,
    isCreateAppointmentOpen: true
  })),
  on(CalendarActions.CloseCreateAppointment, state => ({
    ...state,
    isCreateAppointmentOpen: false
  })),
  on(CalendarActions.CreateAppointment, state => ({
    ...state,
    createState: 'LOADING'
  })),
  on(CalendarActions.CreateAppointmentSuccess, state => ({
    ...state,
    createState: 'LOADED',
    error: null,
    isCreateAppointmentOpen: false
  })),
  on(CalendarActions.CreateAppointmentFailure, (state, { error }) => ({
    ...state,
    createState: 'ERROR',
    error:
      error.message ||
      'There was an error while saving your appointment. Please check the input data and try again.'
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return calendarReducer(state, action);
}
