import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-child',
  template: ` <div class="box">Click me</div>

    <button (click)="sendData()">Send Data</button>
    <button (click)="sendMessage()">Send Message</button>
    <button (click)="send()">Click Me</button>`,
})
export class ChildComponent {
  @Output() dataSent = new EventEmitter<string>();
  sendData() {
    this.dataSent.emit('Hello from Child');
  }

  @Output('clicked') notify = new EventEmitter<string>();
  send() {
    this.notify.emit();
  }

  @Output() message = new EventEmitter<string>();
  sendMessage() {
    this.message.emit('Hello Observable');
  }

  @Output() boxClicked = new EventEmitter<void>(); // Output event

  // Listen for 'click' events on the host element
  @HostListener('click')
  onClick() {
    this.boxClicked.emit(); // Emit the event when clicked
  }

  /*

  Example: Using @Output with @HostListener
  Let’s say you have a component that represents a box. You want to emit an event every time this box is clicked, notifying the parent component when a user interacts with it.

  Instead of adding a (click) event in the component’s HTML template, you can use @HostListener to listen for clicks directly on the host element. Then, you can emit an @Output event to notify the parent.

  */
}
