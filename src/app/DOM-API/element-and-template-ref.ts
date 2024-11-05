import {AfterViewInit, Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';


/*

@ViewChild('myDiv') myDivElement!: ElementRef; retrieves the reference to the <div #myDiv> element.
Using myDivElement.nativeElement, we can access and modify the element directly.

ElementRef provides a direct reference to a DOM element. However, be cautious as this can lead to security risks (e.g., XSS attacks) if not handled carefully, especially if you're injecting HTML.


 */

@Component({
  selector: 'app-sample',
  template: `
    <div #myDiv>Content here</div>`,
  standalone: true
})
export class SampleComponent implements AfterViewInit {
  @ViewChild('myDiv') myDivElement!: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
    // Access and manipulate the div element directly
    this.myDivElement.nativeElement.style.color = 'blue';
    this.myDivElement.nativeElement.innerHTML = 'Updated Content';
  }
}


/*

@ViewChild('myTemplate') myTemplateRef!: TemplateRef<any>; captures the reference to the <ng-template #myTemplate>.
viewContainerRef.createEmbeddedView(this.myTemplateRef); renders the template in the ViewContainerRef, which can be repeated or rendered conditionally.
 */

@Component({
  selector: 'app-sample-template',
  template: `
    <ng-template #myTemplate>
      <p>This is rendered dynamically!</p>
    </ng-template>
    <button (click)="renderTemplate()">Render Template</button>
  `,
  standalone: true
})
export class SampleTemplateComponent {
  @ViewChild('myTemplate') myTemplateRef!: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  renderTemplate() {
    // Renders the template dynamically
    this.viewContainerRef.createEmbeddedView(this.myTemplateRef);
  }
}
