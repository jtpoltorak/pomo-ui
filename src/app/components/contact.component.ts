import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  contactFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit(): boolean {
    if (!this.contactFormGroup.valid) {
      return false;
    } else {
      return true;
    }
  }
}
