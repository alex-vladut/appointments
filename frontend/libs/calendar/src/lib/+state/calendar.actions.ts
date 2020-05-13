import { createAction, props } from '@ngrx/store';
import { CalendarEntity } from './calendar.models';

export const loadCalendar = createAction('[Calendar] Load Calendar');

export const loadCalendarSuccess = createAction(
  '[Calendar] Load Calendar Success',
  props<{ calendar: CalendarEntity[] }>()
);

export const loadCalendarFailure = createAction(
  '[Calendar] Load Calendar Failure',
  props<{ error: any }>()
);
