import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-widget',
  standalone: true,
  template: `
    <div class="widget">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  `
})
export class WidgetComponent {
  @Input() title = 'Widget';
  content = 'Some widget content';

  refresh() {
    this.content = `Content refreshed at ${new Date().toLocaleTimeString()}`;
  }
}
