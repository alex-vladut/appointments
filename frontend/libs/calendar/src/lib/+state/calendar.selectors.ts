import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CALENDAR_FEATURE_KEY,
  State,
  CalendarPartialState,
  calendarAdapter
} from './calendar.reducer';

export const getState = createFeatureSelector<CalendarPartialState, State>(
  CALENDAR_FEATURE_KEY
);

const { selectAll, selectEntities } = calendarAdapter.getSelectors();

export const getLoaded = createSelector(
  getState,
  (state: State) => state.loaded
);

export const getCalendarError = createSelector(
  getState,
  (state: State) => state.error
);

export const getAllAppointments = createSelector(getState, (state: State) =>
  selectAll(state)
);

export const getEntities = createSelector(getState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getWeekDays = createSelector(
  getState,
  (state: State) => state.weekDays
);
