/**
Asynchronous validators in Angular are used when you need to perform validation that involves a delay, such as checking if a username or email is already taken by querying a server.
 */

import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Directive({
  selector: '[appUsernameTaken]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UsernameTakenValidatorDirective,
      multi: true,
    },
  ],
})
export class UsernameTakenValidatorDirective {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const takenUsernames = ['admin', 'user', 'test']; // Mock data
    return of(takenUsernames.includes(control.value)).pipe(
      delay(1000),
      map((isTaken) => (isTaken ? { usernameTaken: true } : null))
    );
  }
}

/**
<form #myForm="ngForm">
  <label for="username">Username</label>
  <input
    id="username"
    name="username"
    ngModel
    required
    appUsernameTaken
  />
  <div *ngIf="myForm?.controls?.username?.errors?.['usernameTaken']">
    Username is already taken.
  </div>
  <div *ngIf="myForm?.controls?.username?.pending">Checking availability...</div>
  <button type="submit" [disabled]="myForm.invalid">Submit</button>
</form>

 */
