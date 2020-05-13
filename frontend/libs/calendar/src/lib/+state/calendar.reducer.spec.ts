import { AppointmentEntity } from './calendar.models';
import * as CalendarActions from './calendar.actions';
import { State, initialState, reducer } from './calendar.reducer';

describe('Calendar Reducer', () => {
  const createCalendarEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as AppointmentEntity);

  beforeEach(() => {});

  describe('valid Calendar actions', () => {
    it('loadCalendarSuccess should return set the list of known Calendar', () => {
      const calendar = [
        createCalendarEntity('PRODUCT-AAA'),
        createCalendarEntity('PRODUCT-zzz')
      ];
      const action = CalendarActions.LoadAppointmentsSuccess({ calendar });

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
