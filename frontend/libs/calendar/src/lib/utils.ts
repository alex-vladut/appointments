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

export const days = {
  0: 'Sun.',
  1: 'Mon.',
  2: 'Tue.',
  3: 'Wed.',
  4: 'Thu.',
  5: 'Fri.',
  6: 'Sat.'
};
