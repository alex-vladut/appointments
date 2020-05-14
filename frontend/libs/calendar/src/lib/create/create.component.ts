import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ng-appointments-calendar-create',
  templateUrl: './create.component.pug',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarCreateComponent {
  form: FormGroup;

  @Input() isVisible: boolean;
  @Input() error: string | null;

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<any>();

  constructor(readonly fb: FormBuilder) {
    this.form = fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      ],
      date: [new Date(), [Validators.required]],
      duration: ['60', [Validators.required]]
    });
  }

  handleSave() {
    if (this.form.valid) {
      const appointment = {
        title: this.form.controls['title'].value,
        date: this.form.controls['date'].value,
        duration: Number(this.form.controls['duration'].value)
      };
      this.save.emit(appointment);
    }
  }
}
