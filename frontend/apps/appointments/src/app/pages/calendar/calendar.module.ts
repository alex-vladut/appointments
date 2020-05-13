import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { CalendarRoutingModule } from './calendar-routing.module';

import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [CalendarRoutingModule, CommonModule, NzButtonModule, NzIconModule],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class CalendarModule {}
