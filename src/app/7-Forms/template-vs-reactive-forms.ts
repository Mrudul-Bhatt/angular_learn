/*
Template-driven Forms
Template-driven forms rely heavily on Angular’s two-way data binding and are simpler to use for basic, straightforward
forms. They are defined primarily in the HTML template using Angular’s NgModel directive and other form-related
directives.

Key Features of Template-driven Forms

Declarative approach: Forms are mostly defined in the HTML template.

Two-way data binding: Uses [(ngModel)] for binding form data to component properties.

Automatic form model creation: Angular generates a form model for you based on the HTML.

Suitable for simple forms: Best for smaller forms with straightforward validation and minimal dynamic behavior.

<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <input name="username" [(ngModel)]="user.username" required />
  <input name="email" [(ngModel)]="user.email" required email />
  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>

Advantages
Simplicity: Easy to set up and understand for simple forms.
Less code: Minimal setup in the component, making it a good choice for simple or static forms.

Disadvantages
Limited control: Less control over form updates and validation.
Harder to test: Since much of the logic is in the template, it can be harder to unit test.
 */


/*
Reactive Forms
Also known as "model-driven forms," provide a more powerful and flexible approach to form management.
They are defined in the component class using Angular’s FormControl, FormGroup, and FormArray classes, allowing more
control over form data and validation.

Key Features of Reactive Forms

Imperative approach: Forms are defined and managed in the component class, not the template.

No two-way data binding: Instead of [(ngModel)], you directly control the form state and data through the FormControl
instances.

Synchronous form validation: Validation and data updates happen immediately when form controls change.

Suitable for complex forms: Best for dynamic, complex forms that require custom validation, dynamic controls, or
advanced logic.
 */

import {FormControl, FormGroup, Validators} from '@angular/forms';

export class MyComponent {
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    console.log(this.userForm.value);
  }
}

/*
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <input formControlName="username" placeholder="Username" />
  <input formControlName="email" placeholder="Email" />
  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
 */
