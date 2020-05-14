import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'ng-appointments-calendar-filter',
  templateUrl: './filter.component.pug',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarFilterComponent {
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() create = new EventEmitter();
}
