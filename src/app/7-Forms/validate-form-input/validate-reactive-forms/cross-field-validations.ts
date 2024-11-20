/**
Cross-field validation involves validating the relationship between two or more fields in a form, such as checking if a "Confirm Password" field matches the "Password" field
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { mismatch: true };
};

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-cross-validation',
  template: ``,
  standalone: true,
})
export class ReactiveCrossValidationComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }
}

/*

<form [formGroup]="myForm">
  <label for="password">Password</label>
  <input id="password" type="password" formControlName="password" />
  <div *ngIf="myForm.get('password')?.errors?.['required']">
    Password is required.
  </div>

  <label for="confirmPassword">Confirm Password</label>
  <input id="confirmPassword" type="password" formControlName="confirmPassword" />
  <div *ngIf="myForm.get('confirmPassword')?.errors?.['required']">
    Confirm Password is required.
  </div>

  <div *ngIf="myForm.errors?.['mismatch']">
    Passwords do not match.
  </div>

  <button type="submit" [disabled]="myForm.invalid">Submit</button>
</form>



*/
