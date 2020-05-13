import { NgModule } from '@angular/core';
import { CalendarModule } from '@ng-appointments/calendar';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [HomeRoutingModule, CalendarModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
