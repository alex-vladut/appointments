import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { startOfWeek, startOfDay, addWeeks, subWeeks } from 'date-fns';
import {
  ApiState,
  ApiStateResult,
  ApiStateError,
} from '@ng-appointments/api-state';

import * as CalendarActions from './calendar.actions';
import { AppointmentEntity, WeekDayEntity } from '../calendar.models';
import { createWeekDays } from '../utils';

export const CALENDAR_FEATURE_KEY = 'calendar';

export interface State extends EntityState<AppointmentEntity> {
  fetchState: ApiStateResult;
  createState: ApiStateResult;
  startDate: Date;
  weekDays: WeekDayEntity[];
  isCreateAppointmentOpen: boolean;
  isViewAppointmentOpen: boolean;
  cancelState: ApiStateResult;
  selectedAppointment?: AppointmentEntity;
}

export interface CalendarPartialState {
  readonly [CALENDAR_FEATURE_KEY]: State;
}

export const calendarAdapter: EntityAdapter<AppointmentEntity> = createEntityAdapter<
  AppointmentEntity
>();

const firstDayOfWeek = startOfDay(startOfWeek(new Date()));

export const initialState: State = calendarAdapter.getInitialState({
  fetchState: ApiState.INIT,
  startDate: firstDayOfWeek,
  weekDays: createWeekDays(firstDayOfWeek),
  createState: ApiState.INIT,
  isCreateAppointmentOpen: false,
  isViewAppointmentOpen: false,
  cancelState: ApiState.INIT,
});

const calendarReducer = createReducer(
  initialState,
  on(CalendarActions.LoadAppointments, (state) => ({
    ...state,
    fetchState: ApiState.LOADING,
  })),
  on(CalendarActions.LoadAppointmentsSuccess, (state, { data }) =>
    calendarAdapter.setAll(data, { ...state, fetchState: ApiState.LOADED })
  ),
  on(CalendarActions.LoadAppointmentsFailure, (state, { error }) => ({
    ...state,
    fetchState: new ApiStateError(error),
  })),
  on(CalendarActions.NextWeek, (state) => {
    const newFirstWeekDay = addWeeks(state.startDate, 1);
    return {
      ...state,
      startDate: newFirstWeekDay,
      weekDays: createWeekDays(newFirstWeekDay),
    };
  }),
  on(CalendarActions.PreviousWeek, (state) => {
    const newFirstWeekDay = subWeeks(state.startDate, 1);
    return {
      ...state,
      startDate: newFirstWeekDay,
      weekDays: createWeekDays(newFirstWeekDay),
    };
  }),
  on(CalendarActions.OpenCreateAppointment, (state) => ({
    ...state,
    isCreateAppointmentOpen: true,
    createState: ApiState.INIT,
  })),
  on(CalendarActions.CloseCreateAppointment, (state) => ({
    ...state,
    isCreateAppointmentOpen: false,
  })),
  on(CalendarActions.OpenViewAppointment, (state, { id }) => ({
    ...state,
    selectedAppointment: state.entities[id],
    isViewAppointmentOpen: true,
  })),
  on(CalendarActions.CloseViewAppointment, (state) => ({
    ...state,
    selectedAppointment: null,
    isViewAppointmentOpen: false,
    cancelState: ApiState.INIT,
  })),
  on(CalendarActions.CancelAppointment, (state) => ({
    ...state,
    cancelState: ApiState.LOADING,
  })),
  on(CalendarActions.CancelAppointmentSuccess, (state) => ({
    ...state,
    cancelState: ApiState.LOADED,
  })),
  on(CalendarActions.CancelAppointmentFailure, (state, { error }) => ({
    ...state,
    cancelState: new ApiStateError(
      error.message ||
        'There was an error while cancelling your appointment. Please try again later.'
    ),
  })),
  on(CalendarActions.CreateAppointment, (state) => ({
    ...state,
    createState: ApiState.LOADING,
  })),
  on(CalendarActions.CreateAppointmentSuccess, (state) => ({
    ...state,
    createState: ApiState.LOADED,
    isCreateAppointmentOpen: false,
  })),
  on(CalendarActions.CreateAppointmentFailure, (state, { error }) => ({
    ...state,
    createState: new ApiStateError(
      error.message ||
        'There was an error while saving your appointment. Please check the input data and try again.'
    ),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return calendarReducer(state, action);
}
