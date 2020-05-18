import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ApiStateResult } from '@ng-appointments/api-state';

import { AppointmentEntity } from '../calendar.models';

@Component({
  selector: 'ng-appointments-calendar-view',
  templateUrl: './view.component.pug',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewComponent {
  @Input() appointment: AppointmentEntity;
  @Input() isVisible: boolean;
  @Input() cancelState: ApiStateResult;

  @Output() cancel = new EventEmitter();
  @Output() cancelAppointment = new EventEmitter<string>();

  handleCancelAppointment() {
    this.cancelAppointment.emit(this.appointment.id);
  }
}
