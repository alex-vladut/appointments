import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromCalendar from './+state/calendar.reducer';
import { CalendarEffects } from './+state/calendar.effects';

import { CalendarComponent } from './calendar.component';
import { CalendarListComponent } from './list/list.component';
import { CalendarCreateComponent } from './create/create.component';
import { CalendarFilterComponent } from './filter/filter.component';
import { API_URL } from './api-url.token';

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzRadioModule,
    NzAlertModule,
    ReactiveFormsModule,
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
  declarations: [
    CalendarComponent,
    CalendarListComponent,
    CalendarCreateComponent,
    CalendarFilterComponent
  ],
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
