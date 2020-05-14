/**
 * Interface for the 'Appointment' data
 */
export interface AppointmentEntity {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

/**
 * Interface for the 'WeekDay' data
 */
export interface WeekDayEntity {
  name: string;
  day: number;
  date: string;
  isToday: boolean;
}
