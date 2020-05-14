import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { range, buildOffset } from '../utils';
import { AppointmentEntity, WeekDayEntity } from '../+state/calendar.models';

@Component({
  selector: 'ng-appointments-calendar-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarListComponent implements OnInit {
  _appointments: { [key: string]: AppointmentEntity };
  @Input() set appointments(appointments: AppointmentEntity[]) {
    this._appointments = appointments
      .map(a => ({
        ...a,
        key: `${a.start.getFullYear()}-${a.start.getMonth()}-${a.start.getDate()}-${a.start.getHours()}`
      }))
      .reduce(
        (acc, value) => ({
          ...acc,
          [value.key]: [...(acc[value.key] || []), value]
        }),
        {}
      );
  }
  @Input() weekDays: WeekDayEntity[];

  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() create = new EventEmitter();

  offset: string;
  hours: any[];

  ngOnInit() {
    this.offset = buildOffset(new Date());
    this.hours = range(0, 24).map(value => ({
      key: value,
      hour: `${value < 10 ? '0' : ''}${value}:00`
    }));
  }

  getAppointments(date: string, hour: number) {
    return this._appointments[`${date}-${hour}`];
  }
}
