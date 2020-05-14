import { AppointmentEntity } from './calendar.models';
import { State, calendarAdapter, initialState } from './calendar.reducer';
import * as CalendarSelectors from './calendar.selectors';

describe('Calendar Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCalendarId = it => it['id'];
  const createAppointmentEntity = (id: string, title = '') =>
    ({
      id,
      title: title || `name-${id}`
    } as AppointmentEntity);

  let state;

  beforeEach(() => {
    state = {
      calendar: calendarAdapter.setAll(
        [
          createAppointmentEntity('PRODUCT-AAA'),
          createAppointmentEntity('PRODUCT-BBB'),
          createAppointmentEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Calendar Selectors', () => {
    it('getAllAppontments() should return the list of Appointments', () => {
      const results = CalendarSelectors.getAllAppointments(state);
      const selId = getCalendarId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CalendarSelectors.getSelected(state);
      const selId = getCalendarId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = CalendarSelectors.getLoaded(state);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' state", () => {
      const result = CalendarSelectors.getCalendarError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
