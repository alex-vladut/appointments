import { getDay, isSameDay, addDays } from 'date-fns';

import { WeekDayEntity } from './calendar.models';

export const range = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);

export const buildOffset = (date: Date) => {
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

export const createWeekDays = (firstDayOfWeek: Date): WeekDayEntity[] =>
  range(0, 6).map(i => {
    const date = addDays(firstDayOfWeek, i);
    return {
      name: days[getDay(date)],
      day: date.getDate(),
      date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      isToday: isSameDay(date, new Date())
    };
  });
