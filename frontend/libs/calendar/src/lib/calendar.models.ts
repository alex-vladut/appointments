/**
 * Interface for the 'Appointment' data
 */
export interface AppointmentEntity {
  id: string;
  title: string;
  start: Date;
  end: Date;
  duration: number;
}

/**
 * Interface for the 'WeekDay' data
 */
export interface WeekDayEntity {
  name: string;
  day: number;
  date: Date;
  isToday: boolean;
}

export type ApiState = 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
