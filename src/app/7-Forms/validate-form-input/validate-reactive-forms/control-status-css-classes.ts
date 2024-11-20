/**
In Angular Reactive Forms, each form control automatically gets CSS classes that reflect its current validation state. These classes can be used to style the form controls dynamically based on their status.

Default CSS Classes for Control Status

Common Classes

ng-untouched: The control has not been touched by the user.
ng-touched: The control has been touched (focused and blurred) by the user.
ng-pristine: The control's value has not been changed.
ng-dirty: The control's value has been changed.
ng-valid: The control's value satisfies all the validators.
ng-invalid: The control's value fails at least one validator.
ng-pending: The control is waiting for the result of an asynchronous validator.

When Classes Change

ng-untouched switches to ng-touched when the user interacts with the control (focus and blur).
ng-pristine switches to ng-dirty when the control's value changes.
ng-valid switches to ng-invalid based on the control's validation status.
 */

/**
<form [formGroup]="myForm">
  <label for="username">Username</label>
  <input id="username" formControlName="username" />
  <div *ngIf="myForm.get('username')?.errors?.['required']" class="error">
    Username is required.
  </div>
</form>

<style>
  input.ng-valid {
    border: 2px solid green;
  }

  input.ng-invalid.ng-touched {
    border: 2px solid red;
  }

  .error {
    color: red;
    font-size: 0.9em;
  }
</style>

 */
