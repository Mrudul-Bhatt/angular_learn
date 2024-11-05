import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-manual-change-detection',
  template: `<p>{{ data }}</p>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManualChangeDetectionComponent {
  data = 'Initial data';

  constructor(private cd: ChangeDetectorRef) {
  }

  updateData() {
    // Mutate data without replacing the object reference
    this.data = 'Updated data';
    this.cd.markForCheck(); // Manually trigger change detection
  }
}


/*


Change Detection Strategies in Angular
Angular provides two main change detection strategies:

Default (ChangeDetectionStrategy.Default): This is Angular's default change detection strategy. Angular checks the entire component tree whenever any change occurs, which can impact performance in large applications.

OnPush (ChangeDetectionStrategy.OnPush): With this strategy, Angular only checks the component and its subtree when:

An @Input reference has changed.
An event (such as a user interaction) has occurred within the component.
Manually triggering change detection is done (using ChangeDetectorRef).





 */
