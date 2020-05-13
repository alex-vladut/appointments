import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CalendarActions from './calendar.actions';
import { CalendarEntity } from './calendar.models';

export const CALENDAR_FEATURE_KEY = 'calendar';

export interface State extends EntityState<CalendarEntity> {
  selectedId?: string | number; // which Calendar record has been selected
  loaded: boolean; // has the Calendar list been loaded
  error?: string | null; // last none error (if any)
}

export interface CalendarPartialState {
  readonly [CALENDAR_FEATURE_KEY]: State;
}

export const calendarAdapter: EntityAdapter<CalendarEntity> = createEntityAdapter<
  CalendarEntity
>();

export const initialState: State = calendarAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const calendarReducer = createReducer(
  initialState,
  on(CalendarActions.loadCalendar, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(CalendarActions.loadCalendarSuccess, (state, { calendar }) =>
    calendarAdapter.addAll(calendar, { ...state, loaded: true })
  ),
  on(CalendarActions.loadCalendarFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return calendarReducer(state, action);
}
