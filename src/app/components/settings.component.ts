import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

import { Settings } from '../models/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnChanges {
  @Input() settings: Settings | undefined = undefined;
  @Output() settingsChange: EventEmitter<Settings> =
    new EventEmitter<Settings>();

  settingsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.settingsFormGroup = this.formBuilder.group({
      timeFormat: new FormControl('colon'),
      showProgressBar: new FormControl(false),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.settings = changes['settings'].currentValue;
    this._setForm();
  }

  private _setForm(): void {
    if (this.settings) {
      this.settingsFormGroup.controls[
        'timeFormat'
      ].setValue(this.settings.timeFormat);
      this.settingsFormGroup.controls[
        'showProgressBar'
      ].setValue(this.settings.showProgressBar);
    }
  }

  onSubmit() {
    if (!this.settingsFormGroup.valid) {
      return false;
    } else {
      this.settings = {
        timeFormat:
          this.settingsFormGroup.controls['timeFormat']
            .value,
        showProgressBar:
          this.settingsFormGroup.controls['showProgressBar']
            .value,
      } as Settings;
      this.settingsChange.emit(this.settings);
      return true;
    }
  }
}
