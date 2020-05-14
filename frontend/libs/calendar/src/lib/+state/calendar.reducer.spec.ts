import { AppointmentEntity } from './calendar.models';
import * as CalendarActions from './calendar.actions';
import { State, initialState, reducer } from './calendar.reducer';

describe('Calendar Reducer', () => {
  const createAppointmentEntity = (id: string, title = '') =>
    ({
      id,
      title: title || `name-${id}`,
    } as AppointmentEntity);

  beforeEach(() => {});

  describe('valid Calendar actions', () => {
    it('loadCalendarSuccess should return set the list of known Calendar', () => {
      const data = [
        createAppointmentEntity('PRODUCT-AAA'),
        createAppointmentEntity('PRODUCT-zzz')
      ];
      const action = CalendarActions.LoadAppointmentsSuccess({ data });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
