// lazy-modal.component.ts
// dynamic-loader.component.ts
import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-lazy-modal',
  template: `
    <div class="modal">Lazy Loaded Modal Component</div>`,
  standalone: true,
  styles: [`.modal {
    border: 1px solid #ccc;
    padding: 10px;
  }`]
})
export class LazyModalComponent {
}


@Component({
  selector: 'app-dynamic-loader',
  standalone: true,
  template: `
    <button (click)="loadModal()">Load Modal</button>
    <ng-container #container></ng-container>
  `
})
export class DynamicLoaderComponent {
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;
  public path = './lazy-modal.component';
  private componentRef!: ComponentRef<any>;

  async loadModal() {
    // Clear any existing component in the container (optional)
    this.container.clear();

    // Dynamically import and create the LazyModalComponent
    const {LazyModalComponent} = await import(this.path);
    this.componentRef = this.container.createComponent(LazyModalComponent);
  }
}
