// message.component.ts
// dynamic-host.component.ts
import {Component, ComponentRef, Input, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-message',
  template: `<p>{{ message }}</p>`,
  standalone: true
})
export class MessageComponent {
  @Input() message: string = 'Default Message';
}


@Component({
  selector: 'app-dynamic-host',
  template: `
    <button (click)="createMessageComponent()">Add Message</button>
    <button (click)="clearMessages()">Clear Messages</button>
    <ng-container #container></ng-container>
  `,
  standalone: true
})
export class DynamicHostComponent {
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;
  private messageComponentRef!: ComponentRef<MessageComponent>;

  createMessageComponent() {
    // Clear previous components if needed (optional)
    this.container.clear();

    // Dynamically create and insert the MessageComponent
    this.messageComponentRef = this.container.createComponent(MessageComponent);
    this.messageComponentRef.instance.message = 'Hello from dynamically created component!';
  }

  clearMessages() {
    // Clears all components in the container
    this.container.clear();
  }
}
