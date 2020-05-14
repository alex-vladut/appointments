import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { startOfWeek, startOfDay, addWeeks, subWeeks } from 'date-fns';

import * as CalendarActions from './calendar.actions';
import { AppointmentEntity, WeekDayEntity } from './calendar.models';
import { createWeekDays } from '../utils';

export const CALENDAR_FEATURE_KEY = 'calendar';

export interface State extends EntityState<AppointmentEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  startDate: Date;
  weekDays: WeekDayEntity[];
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
  })
);

export function reducer(state: State | undefined, action: Action) {
  return calendarReducer(state, action);
}
