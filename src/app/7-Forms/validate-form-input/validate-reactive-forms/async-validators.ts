import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export function usernameExists(control: AbstractControl): Observable<any> {
  const usernames = ['john', 'jane', 'doe']; // Example existing usernames
  return of(usernames.includes(control.value)).pipe(
    delay(500), // Simulate server delay
    map((exists) => (exists ? { usernameTaken: true } : null))
  );
}

/**
Asynchronous validators in Angular are used when you need to perform validation that involves a delay, such as checking if a username or email is already taken by querying a server.
 */

export function usernameTakenValidator(): (
  control: AbstractControl
) => Observable<ValidationErrors | null> {
  const takenUsernames = ['admin', 'user', 'test']; // Mock data

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(takenUsernames.includes(control.value)).pipe(
      delay(1000), // Simulating server delay
      map((isTaken) => (isTaken ? { usernameTaken: true } : null))
    );
  };
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-async-reactive',
  template: ``,
})
export class AsyncReactiveComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required], [usernameTakenValidator()]],
    });
  }
}

/**
<form [formGroup]="myForm">
  <label for="username">Username</label>
  <input id="username" formControlName="username" />
  <div *ngIf="myForm.get('username')?.errors?.['usernameTaken']">
    Username is already taken.
  </div>
  <div *ngIf="myForm.get('username')?.pending">Checking availability...</div>
  <button type="submit" [disabled]="myForm.invalid">Submit</button>
</form>

 */
