import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CalendarEffects } from './calendar.effects';
import * as CalendarActions from './calendar.actions';

describe('CalendarEffects', () => {
  let actions: Observable<any>;
  let effects: CalendarEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CalendarEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(CalendarEffects);
  });

  describe('loadCalendar$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CalendarActions.LoadAppointments() });

      const expected = hot('-a-|', {
        a: CalendarActions.LoadAppointmentsSuccess({ data: [] })
      });

      expect(effects.loadAppointments$).toBeObservable(expected);
    });
  });
});
