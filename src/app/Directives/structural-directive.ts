/*

TODO
  2. Structural Directives
  Structural directives change the DOM by adding or removing elements. They are prefixed with an asterisk (*), signaling
  that they alter the structure.
  Common Structural Directives
    *ngIf - Conditionally adds or removes elements from the DOM.
    *ngFor - Loops over data to create a list of elements.
    *ngSwitch - Switches between multiple elements based on a given condition.


 */


/*

<div *ngIf="isLoggedIn; else loginTemplate">
  Welcome back!
</div>

<ng-template #loginTemplate>
  <p>Please log in to continue.</p>
</ng-template>

 */


/*
TODO:
  Custom Structural Directives
  Angular allows you to create custom structural directives to encapsulate and reuse logic. This is useful for complex
  conditions or reoccurring patterns.
  Example of Custom Structural Directive: Suppose we want a custom directive, *appShowOnRole, to display an element
  only for users with a specified role.
 */


import {Component, Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appShowOnRole]'
})
export class ShowOnRoleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  @Input() set appShowOnRole(role: string) {
    if (this.checkUserRole(role)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkUserRole(role: string): boolean {
    // Simulate user role check (should come from a service in real apps)
    const currentUserRole = 'admin';
    return currentUserRole === role;
  }
}

/*
TODO
  In this custom directive:
    ViewContainerRef controls the view and manages the addition or removal of the element.
    TemplateRef represents the element template.
    The directive checks the user’s role, and if it matches the specified role, the view is added; otherwise, it is removed.
 */


@Component({
  selector: 'app-showOnRole',
  template: `
    <div *appShowOnRole="'admin'">
      This is only visible to admins.
    </div>
  `,
  standalone: true,
  imports: [
    ShowOnRoleDirective
  ]
})
export class ShowOnRoleComponent {

}


/*

How angular interprets following shorthands :

*ngFor="let item of [1,2,3]"
<ng-template ngFor let-item [ngForOf]="[1, 2, 3]">

*ngFor="let item of [1,2,3] as items; trackBy: myTrack; index as i"
<ng-template ngFor let-item [ngForOf]="[1,2,3]" let-items="ngForOf" [ngForTrackBy]="myTrack" let-i="index">

*ngIf="exp"
<ng-template [ngIf]="exp">

*ngIf="exp as value"	
<ng-template [ngIf]="exp" let-value="ngIf">


*/
