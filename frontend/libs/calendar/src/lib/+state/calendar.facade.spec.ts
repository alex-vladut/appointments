import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { AppointmentEntity } from '../calendar.models';
import { CalendarEffects } from './calendar.effects';
import { CalendarFacade } from './calendar.facade';

import {
  CALENDAR_FEATURE_KEY,
  State,
  reducer
} from './calendar.reducer';

interface TestSchema {
  calendar: State;
}

describe('CalendarFacade', () => {
  let facade: CalendarFacade;
  let store: Store<TestSchema>;
  const createAppointmentEntity = (id: string, title = '') =>
    ({
      id,
      title: title || `name-${id}`
    } as AppointmentEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CALENDAR_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CalendarEffects])
        ],
        providers: [CalendarFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(CalendarFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allAppointments$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAppointments();

        list = await readFirst(facade.allAppointments$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
