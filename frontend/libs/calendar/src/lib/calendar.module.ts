import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromCalendar from './+state/calendar.reducer';
import { CalendarEffects } from './+state/calendar.effects';

import { CalendarComponent } from './calendar.component';
import { CalendarListComponent } from './list/list.component';
import { API_URL } from './api-url.token';

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    StoreModule.forFeature(
      fromCalendar.CALENDAR_FEATURE_KEY,
      fromCalendar.reducer
    ),
    EffectsModule.forFeature([CalendarEffects]),
    StoreModule.forFeature(
      fromCalendar.CALENDAR_FEATURE_KEY,
      fromCalendar.reducer
    )
  ],
  declarations: [CalendarComponent, CalendarListComponent],
  exports: [CalendarComponent]
})
export class CalendarModule {
  static forRoot(apiUrl: string): ModuleWithProviders {
    return {
      ngModule: CalendarModule,
      providers: [{ provide: API_URL, useValue: apiUrl }]
    };
  }
}
