/*
Angular introduced strictly typed reactive forms in version 14 to provide better type safety when working with reactive
forms. With this feature, Angular forms leverage TypeScript’s type-checking capabilities to ensure that form structures
and values align with your data models

Key Benefits of Strictly Typed Reactive Forms
Compile-time type checking:

Errors in the form structure are caught at compile time, not runtime.
You cannot accidentally bind the wrong control or access invalid properties.
Intelligent code completion:

TypeScript’s autocomplete works seamlessly, suggesting control names and data types.
Stronger alignment with data models:

Form structures are tied directly to TypeScript interfaces or types, ensuring consistency.
No need for casting:

Accessing controls no longer requires repetitive type casting like as FormGroup.
 */


/*
Enabling Strictly Typed Reactive Forms
Angular’s reactive forms now infer types from FormControl, FormGroup, and FormArray when initialized with strict typing in TypeScript.

1. Define a TypeScript Interface or Type
Start by defining an interface that represents your form data structure.

2. Create a Strictly Typed FormGroup
Pass a type parameter (FormGroup<{...}>) to define the structure and types of the form controls.
 */

interface UserProfile {
  name: string;
  email: string;
  skills: string[];
}

import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true
})
export class UserProfileComponent {
  // Strictly typed form group
  userProfileForm = new FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    skills: FormArray<FormControl<string | null>>;
  }>({
    name: new FormControl(''),
    email: new FormControl(''),
    skills: new FormArray<FormControl<string | null>>([]),
  });

  // Getter for skills array
  get skills() {
    return this.userProfileForm.controls.skills;
  }

  // Add a new skill
  addSkill() {
    this.skills.push(new FormControl(''));
  }

  // Remove a skill by index
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Handle form submission
  onSubmit() {
    const formValue: UserProfile = this.userProfileForm.value as UserProfile;
    console.log(formValue);
  }
}

/*
Key Features in Strictly Typed Reactive Forms
1. Strongly Typed Controls
When defining form controls, you specify their types:

FormControl<string>;
FormControl<number>;

This ensures that the control always holds values of the specified type, and any attempt to assign incompatible types
will result in a compile-time error.

2. Typed FormArray
When working with FormArray, you can specify the type of its controls:

skills: new FormArray<FormControl<string>>([]);

This ensures all elements in the array are FormControl<string> and prevents adding controls of incorrect types.

3. Typed Accessors
You no longer need to cast when accessing controls or their values:

const name: string = this.userProfileForm.controls.name.value; // TypeScript ensures `name` is a string

For arrays:

const firstSkill: string = this.skills.at(0).value; // Ensures `firstSkill` is a string

 */


/*
<form [formGroup]="userProfileForm" (ngSubmit)="onSubmit()">
  <label>
    Name:
    <input formControlName="name" placeholder="Enter your name" />
  </label>

  <label>
    Email:
    <input formControlName="email" placeholder="Enter your email" />
  </label>

  <div formArrayName="skills">
    <h3>Skills</h3>
    <button type="button" (click)="addSkill()">Add Skill</button>

    <div *ngFor="let skill of skills.controls; let i = index">
      <input [formControlName]="i" placeholder="Skill {{ i + 1 }}" />
      <button type="button" (click)="removeSkill(i)">Remove</button>
    </div>
  </div>

  <button type="submit" [disabled]="userProfileForm.invalid">Submit</button>
</form>
 */

/*
Advantages of Strictly Typed Reactive Forms
Compile-time Safety:

Angular ensures that form structure and types match your data model during development.
Eliminates Casting:

No need for repetitive type casting like as FormGroup or as FormArray.
Improved Readability:

Explicit types make forms easier to understand and maintain.
Enhanced Debugging:

Errors in form definitions or bindings are caught early.
 */
