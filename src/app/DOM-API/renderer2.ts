import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dom-renderer',
  template: `
    <button #btn>Click me</button>`,
  standalone: true
})
export class DomRendererComponent implements AfterViewInit {
  @ViewChild('btn') button!: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    // Adding a CSS class to the button
    this.renderer.addClass(this.button.nativeElement, 'active');

    // Setting an attribute
    this.renderer.setAttribute(this.button.nativeElement, 'aria-label', 'Dynamic Button');

    // Listen for clicks using Renderer2
    this.renderer.listen(this.button.nativeElement, 'click', () => {
      console.log('Button was clicked!');
    });
  }
}


/*

Renderer2 is Angular’s preferred way to manipulate DOM elements because it is platform-agnostic and safer. Using Renderer2 also keeps your code compatible with Angular’s server-side rendering and web workers.
 */
