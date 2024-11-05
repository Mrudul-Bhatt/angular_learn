import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {WidgetComponent} from "../widget/widget.component";
import {UserProfileComponent} from "../user-profile/user-profile.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WidgetComponent,
    UserProfileComponent
  ],
  template: `
    <h2>Dashboard</h2>
    <button (click)="refreshAllWidgets()">Refresh All Widgets</button>
    <button (click)="updateUserProfile()">Update User Profile</button>

    <!-- ViewChild and ViewChildren examples -->
    <app-widget title="Sales Data"></app-widget>
    <app-widget title="Customer Feedback"></app-widget>
    <app-user-profile></app-user-profile>

    <!-- ContentChild and ContentChildren examples -->
    <ng-content></ng-content>
  `
})
export class DashboardComponent implements AfterViewInit {
  // Access the first User Profile component instance within the dashboard
  @ViewChild(UserProfileComponent) userProfile!: UserProfileComponent;

  // Access all WidgetComponent instances within the dashboard
  @ViewChildren(WidgetComponent) widgets!: QueryList<WidgetComponent>;

  // Access a projected specific widget from ng-content
  @ContentChild(WidgetComponent) projectedWidget!: WidgetComponent;

  // Access all projected widgets from ng-content
  @ContentChildren(WidgetComponent) projectedWidgets!: QueryList<WidgetComponent>;

  ngAfterViewInit() {
    // Initial interaction with the widgets
    console.log('Initial user profile:', this.userProfile.profileInfo);

    // Check and interact with projected widgets
    this.projectedWidgets.forEach((widget, index) => {
      console.log(`Projected Widget ${index + 1} Title:`, widget.title);
    });
  }

  refreshAllWidgets() {
    // Refresh all widgets within the dashboard
    this.widgets.forEach(widget => widget.refresh());
    this.projectedWidgets.forEach(widget => widget.refresh());
  }

  updateUserProfile() {
    // Update the profile widget specifically
    if (this.userProfile) {
      this.userProfile.updateProfileInfo('User: Jane Doe');
    }
  }
}
