import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CALENDAR_FEATURE_KEY,
  State,
  CalendarPartialState,
  calendarAdapter
} from './calendar.reducer';

// Lookup the 'Calendar' feature state managed by NgRx
export const getCalendarState = createFeatureSelector<
  CalendarPartialState,
  State
>(CALENDAR_FEATURE_KEY);

const { selectAll, selectEntities } = calendarAdapter.getSelectors();

export const getCalendarLoaded = createSelector(
  getCalendarState,
  (state: State) => state.loaded
);

export const getCalendarError = createSelector(
  getCalendarState,
  (state: State) => state.error
);

export const getAllCalendar = createSelector(getCalendarState, (state: State) =>
  selectAll(state)
);

export const getCalendarEntities = createSelector(
  getCalendarState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCalendarState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCalendarEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
