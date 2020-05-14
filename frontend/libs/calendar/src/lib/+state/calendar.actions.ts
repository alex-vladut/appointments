import { createAction, props } from '@ngrx/store';

import { AppointmentEntity } from './calendar.models';

const _ = (action: string) => `[Calendar] ${action}`;

export const LoadAppointments = createAction(_('Load Appointments'));

export const LoadAppointmentsSuccess = createAction(
  _('Load Appointments Success'),
  props<{ data: AppointmentEntity[] }>()
);

export const LoadAppointmentsFailure = createAction(
  _('Load Appointments Failure'),
  props<{ error: any }>()
);

export const NextWeek = createAction(_('Next Week'));

export const PreviousWeek = createAction(_('Previous Week'));
