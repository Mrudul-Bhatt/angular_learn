/**
Cross-field validation involves validating the relationship between two or more fields in a form, such as checking if a "Confirm Password" field matches the "Password" field. Here's how to implement cross-field validations in both Template-driven and Reactive Forms in Angular.
 */

import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordMatchValidatorDirective implements Validator {
  @Input('appPasswordMatch') passwordGroup!: AbstractControl;

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
}

/**
<form #myForm="ngForm" [appPasswordMatch]="myForm">
  <div ngModelGroup="passwordGroup">
    <label for="password">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      ngModel
      required
      minlength="8"
    />
    <div *ngIf="myForm?.controls?.passwordGroup?.errors?.['mismatch']">
      Passwords do not match.
    </div>

    <label for="confirmPassword">Confirm Password</label>
    <input
      id="confirmPassword"
      name="confirmPassword"
      type="password"
      ngModel
      required
    />
  </div>
  <button type="submit" [disabled]="myForm.invalid">Submit</button>
</form>

 */
