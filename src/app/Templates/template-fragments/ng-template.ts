import {AfterViewInit, Component, TemplateRef, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-ng-template",
  template: `

    <button (click)="toggleTemplate()">Toggle Template</button>

    <ng-template #firstTemplate>
      <p>This is the first template!</p>
    </ng-template>

    <ng-template #secondTemplate>
      <p>This is the second template!</p>
    </ng-template>

    <!-- Display the selected template -->
    <ng-container *ngTemplateOutlet="currentTemplate"></ng-container>

  `,
  standalone: true,
  imports: [CommonModule]
})
export class NgTemplateComponent implements AfterViewInit {
  @ViewChild('firstTemplate') firstTemplate!: TemplateRef<any>;
  @ViewChild('secondTemplate') secondTemplate!: TemplateRef<any>;

  currentTemplate: TemplateRef<any> | null = null;

  toggleTemplate() {
    this.currentTemplate = this.currentTemplate === this.firstTemplate ? this.secondTemplate : this.firstTemplate;
  }

  ngAfterViewInit() {
    // Initialize with the first template
    this.currentTemplate = this.firstTemplate;
  }
}


