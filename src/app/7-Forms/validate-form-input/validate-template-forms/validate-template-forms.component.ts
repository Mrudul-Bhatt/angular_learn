import { ForbiddenNameDirective } from './cutom-validator';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validate-template-forms',
  standalone: true,
  imports: [FormsModule, CommonModule, ForbiddenNameDirective],
  templateUrl: './validate-template-forms.component.html',
  styleUrl: './validate-template-forms.component.css',
})
export class ValidateTemplateFormsComponent {
  user = {
    name: '',
    email: '',
    username: '',
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', this.user);
    } else {
      console.log('Form is invalid.');
    }
  }
}

/**


In template-driven forms, Angular provides a variety of built-in validation directives for validating inputs. You can also implement custom validations to enforce specific rules. Validation messages can be conditionally displayed based on the input's state.

Validating Input in Template-Driven Forms
1. Built-in Validation Directives
Angular has built-in validation directives to enforce common rules:

Validation Rule	     Directive

Required field	     required
Minimum length	     minlength
Maximum length	     maxlength
Email format	       email
Pattern matching	   pattern="regex"

 */

/**

Best Practices
Use touched or dirty:

Ensure that validation messages only display after the user interacts with the input.
Example: *ngIf="control.touched && control.invalid".
Disable Submit Button:

Use [disabled]="form.invalid" to prevent submission when the form is invalid.
Reusability:

Create custom validation directives for repeated validation logic (e.g., forbidden words, domain-specific checks).
Dynamic Feedback:

Use CSS to provide immediate visual feedback for valid/invalid fields.

 */
