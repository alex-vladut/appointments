import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  startOfWeek,
  startOfDay,
  addDays,
  getDay,
  isSameDay,
  addWeeks,
  subWeeks
} from 'date-fns';

import { range, days, buildOffset } from '../utils';
import { AppointmentEntity } from '../+state/calendar.models';

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

  startDate: Date;
  offset: string;
  weekDays: any[];
  hours = range(0, 24).map(value => ({
    key: value,
    hour: `${value < 10 ? '0' : ''}${value}:00`
  }));

  ngOnInit() {
    this.startDate = startOfWeek(startOfDay(new Date()));

    this.init();
  }

  private init() {
    this.offset = buildOffset(this.startDate);
    this.weekDays = range(0, 6).map(i => {
      const date = addDays(this.startDate, i);
      return {
        name: days[getDay(date)],
        day: date.getDate(),
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        isToday: isSameDay(date, new Date())
      };
    });
  }

  onBack() {
    this.startDate = subWeeks(this.startDate, 1);

    this.init();
  }

  onNext() {
    this.startDate = addWeeks(this.startDate, 1);

    this.init();
  }

  getAppointments(date: string, hour: number) {
    return this._appointments[`${date}-${hour}`];
  }
}
