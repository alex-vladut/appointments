import { createAction, props } from '@ngrx/store';

import { AppointmentEntity } from '../calendar.models';

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

export const OpenCreateAppointment = createAction(_('Open Create Appointment'));

export const CloseCreateAppointment = createAction(
  _('Close Create Appointment')
);

export const OpenViewAppointment = createAction(
  _('Open View Appointment'),
  props<{ id: string }>()
);

export const CloseViewAppointment = createAction(_('Close View Appointment'));

export const CancelAppointment = createAction(
  _('Cancel Appointment'),
  props<{ id: string }>()
);

export const CancelAppointmentSuccess = createAction(
  _('Cancel Appointment Success')
);

export const CancelAppointmentFailure = createAction(
  _('Cancel Appointment Failure'),
  props<{ error: any }>()
);

export const CreateAppointment = createAction(
  _('Create Appointment'),
  props<{ appointment: any }>()
);

export const CreateAppointmentSuccess = createAction(
  _('Create Appointment Success')
);

export const CreateAppointmentFailure = createAction(
  _('Create Appointment Failure'),
  props<{ error: any }>()
);
