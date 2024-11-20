import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-forms-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-forms-example.component.html',
  styleUrl: './template-forms-example.component.css',
})
export class TemplateFormsExampleComponent {
  user = {
    name: '',
    email: '',
    password: '',
    hobbies: [''],
  };

  addHobby() {
    this.user.hobbies.push('');
  }

  removeHobby(index: number) {
    this.user.hobbies.splice(index, 1);
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', this.user);
    } else {
      console.log('Form is invalid.');
    }
  }
}

/*
Template-driven forms in Angular rely on directives and two-way data binding ([(ngModel)]) to manage form inputs. These forms are less complex to set up compared to reactive forms and are particularly suited for smaller or simpler forms. They automatically synchronize form inputs and a model defined in the component.

Key Features of Template-driven Forms

Declarative approach: The form structure is defined directly in the template (HTML).
Uses Angular directives like ngForm, ngModel, and ngSubmit.

Two-way data binding: Data is automatically synced between the form and the component model using [(ngModel)].

Automatic form model creation: Angular generates a FormGroup under the hood to manage the form's state and validation.

Validation: Use Angular validation directives (e.g., required, email) and bind validation messages directly in the template.
*/

/**

3. Explaining the Key Elements
ngModel Directive:

Binds the form input to a property in the component model.
Enables two-way data binding using [(ngModel)].
ngForm Directive:

Automatically creates a FormGroup to manage the entire form.
Access the form’s state (e.g., form.valid, form.dirty).
Validation Directives:

Built-in directives like required, email, minlength, etc., add validation to inputs.
Custom validations can also be added.
Error Handling:

Check the input control’s validity using form.controls['controlName'].
Display error messages conditionally based on the control's state.
 */
