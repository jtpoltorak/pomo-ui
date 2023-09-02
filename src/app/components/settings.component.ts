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
  @Output() settingsRestore: EventEmitter<null> =
    new EventEmitter<null>();
  @Output() settingsCancel: EventEmitter<null> =
    new EventEmitter<null>();
  @Output() settingsSave: EventEmitter<Settings> =
    new EventEmitter<Settings>();

  settingsFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.settingsFormGroup = this.formBuilder.group({
      timeFormat: new FormControl('colon'),
      showProgressBar: new FormControl(false),
      workDuration: new FormControl(),
      shortBreakDuration: new FormControl(),
      longBreakDuration: new FormControl(),
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
      this.settingsFormGroup.controls[
        'workDuration'
      ].setValue(
        this.settings.workDurationMS / (60 * 1000),
      );
      this.settingsFormGroup.controls[
        'shortBreakDuration'
      ].setValue(
        this.settings.shortBreakDurationMS / (60 * 1000),
      );
      this.settingsFormGroup.controls[
        'longBreakDuration'
      ].setValue(
        this.settings.longBreakDurationMS / (60 * 1000),
      );
    }
  }

  onRestoreButtonClick(): void {
    this.settingsRestore.emit();
  }

  onCancelButtonClick(): void {
    this.settingsCancel.emit();
  }

  onSubmit(): boolean {
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
        workDurationMS:
          this.settingsFormGroup.controls['workDuration']
            .value *
          60 *
          1000,
        shortBreakDurationMS:
          this.settingsFormGroup.controls[
            'shortBreakDuration'
          ].value *
          60 *
          1000,
        longBreakDurationMS:
          this.settingsFormGroup.controls[
            'longBreakDuration'
          ].value *
          60 *
          1000,
      } as Settings;
      this.settingsSave.emit(this.settings);
      return true;
    }
  }
}
