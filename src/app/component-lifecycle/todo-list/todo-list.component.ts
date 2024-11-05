import {Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import {TodoService} from "../todo.service";
import {Subscription} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  template: `

    <h2>Todo List</h2>
    <h2>Search Box</h2>
    <input #searchInput type="text" placeholder="Type your search..."/>
    <ul>
      <li *ngFor="let todo of todos">{{ todo }}</li>
    </ul>
    <button (click)="addTodo()">Add Random Todo</button>
    <!--    <p>Time open: {{ secondsOpen }} seconds</p>-->
  `,
  imports: [
    NgForOf
  ],
  styles: [
    `h2 {
      color: #2c3e50;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      background: #ecf0f1;
      margin: 4px 0;
      padding: 8px;
      border-radius: 4px;
    }

    button {
      margin-top: 12px;
    }`
  ]
})
export class TodoListComponent {
  todos: string[] = [];
  @Input() product: { name: string; price: number } = {name: '', price: 0};
  @Input() discount: number | null = null;
  discountedPrice: number | null = null;
  @ViewChild('searchInput') searchInput!: ElementRef;
  private todoSubscription!: Subscription;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    // Fetch data when the component initializes
    this.todoSubscription = this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
      console.log('Todos initialized:', this.todos);
    });
  }

  ngDoCheck() {
    console.log('Checking for updates in todos:', this.todos);
  }

  addTodo() {
    const newTodo = `Random Todo ${Math.floor(Math.random() * 100)}`;
    this.todoService.addTodo(newTodo);
  }

  ngOnDestroy() {
    // Cleanup subscriptions to prevent memory leaks
    this.todoSubscription.unsubscribe();
    console.log('Component destroyed, subscriptions cleaned up.');
  }

  // Usually used for @Input changes
  ngOnChanges(changes: SimpleChanges) {
    // React to changes in the product or discount input properties
    if (changes['discount'] && this.discount != null) {
      this.discountedPrice = this.product.price - (this.product.price * this.discount) / 100;
      console.log('Discount applied:', this.discountedPrice);
    }
  }

  ngAfterViewInit() {
    // Focus on the input field once the view is initialized
    this.searchInput.nativeElement.focus();
    console.log('Search input focused.');
  }

  /*
  *
  *

  Summary of Practical Uses

  ngOnInit: Initializes data or subscriptions.
  ngOnDestroy: Cleans up subscriptions or other resources.
  ngOnChanges: Responds to changes in @Input properties.
  ngAfterViewInit: Accesses the DOM or child components once the view is ready.
  *
  * */

}
