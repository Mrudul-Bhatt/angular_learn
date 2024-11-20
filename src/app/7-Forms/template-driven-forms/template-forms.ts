/*
Template-driven forms in Angular rely on directives and two-way data binding ([(ngModel)]) to manage form inputs. These forms are less complex to set up compared to reactive forms and are particularly suited for smaller or simpler forms. They automatically synchronize form inputs and a model defined in the component.

Key Features of Template-driven Forms

Declarative approach: The form structure is defined directly in the template (HTML).
Uses Angular directives like ngForm, ngModel, and ngSubmit.

Two-way data binding: Data is automatically synced between the form and the component model using [(ngModel)].

Automatic form model creation: Angular generates a FormGroup under the hood to manage the form's state and validation.

Validation: Use Angular validation directives (e.g., required, email) and bind validation messages directly in the template.
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-template-form',
  template: ``,
  standalone: true,
})
export class TemplateFormComponent {
  // Define the model
  user = {
    name: '',
    email: '',
    password: '',
  };

  // Submit function
  onSubmit(form: any) {
    console.log('Form Submitted!', form);
    console.log('Form Data:', this.user);
  }
}

/**

<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <!-- Name Input -->
  <label>
    Name:
    <input
      type="text"
      name="name"
      [(ngModel)]="user.name"
      required />
  </label>
  <div *ngIf="form.controls['name']?.invalid && form.controls['name']?.touched">
    Name is required.
  </div>

  <!-- Email Input -->
  <label>
    Email:
    <input
      type="email"
      name="email"
      [(ngModel)]="user.email"
      required
      email />
  </label>
  <div *ngIf="form.controls['email']?.invalid && form.controls['email']?.touched">
    <div *ngIf="form.controls['email']?.errors?.['required']">Email is required.</div>
    <div *ngIf="form.controls['email']?.errors?.['email']">Invalid email format.</div>
  </div>

  <!-- Password Input -->
  <label>
    Password:
    <input
      type="password"
      name="password"
      [(ngModel)]="user.password"
      required
      minlength="6" />
  </label>
  <div *ngIf="form.controls['password']?.invalid && form.controls['password']?.touched">
    <div *ngIf="form.controls['password']?.errors?.['required']">Password is required.</div>
    <div *ngIf="form.controls['password']?.errors?.['minlength']">
      Password must be at least 6 characters long.
    </div>
  </div>

  <!-- Submit Button -->
  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>


 */
