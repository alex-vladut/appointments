import { Component, OnInit } from '@angular/core';

import {
  startOfWeek,
  startOfDay,
  addDays,
  getDay,
  isSameDay,
  addWeeks,
  subWeeks
} from 'date-fns';

const range = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);

const buildOffset = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset() / 60;
  if (timezoneOffset === 0) {
    return 'UTC';
  } else if (timezoneOffset > 0) {
    return `UTC+${timezoneOffset}`;
  } else {
    return `UTC${timezoneOffset}`;
  }
};

const days = {
  0: 'Sun.',
  1: 'Mon.',
  2: 'Tue.',
  3: 'Wed.',
  4: 'Thu.',
  5: 'Fri.',
  6: 'Sat.'
};

@Component({
  selector: 'ng-appointments-calendar',
  templateUrl: './calendar.component.pug',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  startDate: Date;
  offset: string;
  loading = false;
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
}
