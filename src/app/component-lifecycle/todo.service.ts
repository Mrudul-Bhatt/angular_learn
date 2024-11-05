import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos = new BehaviorSubject<string[]>(['Learn Angular', 'Build a project']);
  todos$ = this.todos.asObservable();

  constructor() {
  }

  addTodo(newTodo: string) {
    const currentTodos = this.todos.value;
    this.todos.next([...currentTodos, newTodo]);
  }
}
