import {PseudoClassSelectorComponent} from './selectors/pseudo-class-selector/pseudo-class-selector.component';
import {CombinedSelectorComponent} from './selectors/combined-selector/combined-selector.component';
import {ClassSelectorComponent} from './selectors/class-selector/class-selector.component';
import {AttributeSelectorComponent} from './selectors/attribute-selector/attribute-selector.component';
import {TypeSelectorComponent} from './selectors/type-selector/type-selector.component';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {TodoListComponent} from "./component-lifecycle/todo-list/todo-list.component";
import {DashboardComponent} from "./referencing-component-children/practical/dashboard/dashboard.component";
import {WidgetComponent} from "./referencing-component-children/practical/widget/widget.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TypeSelectorComponent,
    AttributeSelectorComponent,
    ClassSelectorComponent,
    CombinedSelectorComponent,
    PseudoClassSelectorComponent,
    TodoListComponent,
    DashboardComponent,
    WidgetComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'learn';
}
