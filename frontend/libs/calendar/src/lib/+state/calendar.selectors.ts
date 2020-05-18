import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CALENDAR_FEATURE_KEY,
  State,
  CalendarPartialState,
  calendarAdapter,
} from './calendar.reducer';

export const getState = createFeatureSelector<CalendarPartialState, State>(
  CALENDAR_FEATURE_KEY
);

const { selectAll, selectEntities } = calendarAdapter.getSelectors();

export const getAllAppointments = createSelector(getState, (state: State) =>
  selectAll(state)
);

export const getEntities = createSelector(getState, (state: State) =>
  selectEntities(state)
);

export const getSelectedAppointment = createSelector(
  getState,
  (state: State) => state.selectedAppointment
);

export const getStartDate = createSelector(
  getState,
  (state: State) => state.startDate
);

export const getWeekDays = createSelector(
  getState,
  (state: State) => state.weekDays
);

export const getCreateAppointmentOpen = createSelector(
  getState,
  (state: State) => state.isCreateAppointmentOpen
);

export const getViewAppointmentOpen = createSelector(
  getState,
  (state: State) => state.isViewAppointmentOpen
);

export const getCreateState = createSelector(
  getState,
  (state: State) => state.createState
);

export const getCancelState = createSelector(
  getState,
  (state: State) => state.cancelState
);
