import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { isBefore, setHours, format } from 'date-fns';

import { range, buildOffset } from '../utils';
import { AppointmentEntity, WeekDayEntity } from '../calendar.models';

@Component({
  selector: 'ng-appointments-calendar-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarListComponent implements OnInit {
  cells: any[];
  offset: string;

  _appointments: AppointmentEntity[];
  @Input() set appointments(appointments: AppointmentEntity[]) {
    this._appointments = appointments;

    this.buildCells(appointments);
  }
  get appointments() {
    return this._appointments;
  }
  @Input() weekDays: WeekDayEntity[] = [];

  @Output() view = new EventEmitter<string>();

  ngOnInit() {
    this.offset = buildOffset(new Date());
  }

  private buildCells(appointments: AppointmentEntity[]) {
    const appointmentsMap = appointments
      .map((a) => ({
        ...a,
        key: format(a.start, 'yyyy-MM-dd-HH'),
      }))
      .reduce(
        (acc, value) => ({
          ...acc,
          [value.key]: [...(acc[value.key] || []), value],
        }),
        {}
      );

    this.cells = range(0, 24).map((hour) => {
      const days = this.weekDays.map((day) => ({
        isPast: isBefore(setHours(day.date, hour), new Date()),
        appointments:
          appointmentsMap[format(setHours(day.date, hour), 'yyyy-MM-dd-HH')] ||
          [],
      }));
      return {
        hour: `${hour < 10 ? '0' : ''}${hour}:00`,
        days,
      };
    });
  }
}
