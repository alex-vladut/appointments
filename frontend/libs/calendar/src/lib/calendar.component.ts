import { Component, OnInit } from '@angular/core';

import { CalendarFacade } from './+state/calendar.facade';

@Component({
  selector: 'ng-appointments-calendar',
  templateUrl: './calendar.component.pug'
})
export class CalendarComponent implements OnInit {
  constructor(readonly facade: CalendarFacade) {}

  ngOnInit() {
    this.facade.loadAppointments();
  }
}
