/*

In Angular, <ng-container> is a useful tool for grouping elements without adding extra nodes to the DOM. Unlike <div> or
other HTML elements, <ng-container> does not produce an element; it simply serves as a wrapper that organizes content
and applies structural directives (*ngIf, *ngFor, etc.) without impacting the DOM structure.


 */


/*

Example 1: Conditional Rendering with <ng-container>
Suppose we want to display a user’s profile information only if the user is logged in. Without <ng-container>, we might
have added a <div> just to use *ngIf.


<ng-container *ngIf="isLoggedIn">
  <h2>Welcome, {{ userName }}!</h2>
  <p>Your account settings are available.</p>
</ng-container>


 */


/*

Example 2: Nesting Directives with <ng-container>
Angular doesn’t allow multiple structural directives on a single element. However, by grouping elements with
<ng-container>, you can nest them logically.


<ng-container *ngIf="showUsers">
  <ul>
    <ng-container *ngFor="let user of users">
      <li>{{ user.name }}</li>
    </ng-container>
  </ul>
</ng-container>



 */


/*

Example 3: Grouping Content with Dynamic Bindings

<ng-container [ngSwitch]="status">
  <p *ngSwitchCase="'active'">The account is active.</p>
  <p *ngSwitchCase="'inactive'">The account is inactive.</p>
  <p *ngSwitchDefault>The account status is unknown.</p>
</ng-container>



 */
