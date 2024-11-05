import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-pass-context-to-ng-template',
  template: `

    <!-- Define a template with context variable binding -->
    <ng-template #customTemplate let-name="name">
      <p>Hello, {{ name }}!</p>
    </ng-template>

    <!-- Render template with context data -->
    <ng-container *ngTemplateOutlet="customTemplate; context: { name: 'Angular' }"></ng-container>

  `,
  standalone: true,
  imports: [CommonModule]
})
export class PassContextToNgTemplate {

}


/*

Output :

<p>Hello, Angular!</p>


 */
