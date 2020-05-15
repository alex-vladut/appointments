import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { AppointmentEntity, ApiState } from '../calendar.models';

@Component({
  selector: 'ng-appointments-calendar-view',
  templateUrl: './view.component.pug',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewComponent {
  @Input() appointment: AppointmentEntity;
  @Input() isVisible: boolean;
  @Input() cancelState: ApiState;
  @Input() error: string | null;

  @Output() cancel = new EventEmitter();
  @Output() cancelAppointment = new EventEmitter<string>();

  handleCancelAppointment() {
    this.cancelAppointment.emit(this.appointment.id);
  }
}
