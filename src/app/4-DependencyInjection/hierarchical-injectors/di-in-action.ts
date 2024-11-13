/*
1. Custom Providers with @Inject and InjectionToken
Custom providers allow us to specify dependencies that are not standard services, such as browser APIs or objects
without a dedicated Angular service. The example uses an InjectionToken to provide access to localStorage via
dependency injection:
 */

/*
InjectionToken: BROWSER_STORAGE is created as a unique identifier to inject localStorage as a dependency.

Factory Function: The token’s factory returns localStorage directly from the browser’s window object.

@Inject Decorator: The @Inject decorator on the constructor parameter explicitly tells Angular to inject the object
associated with BROWSER_STORAGE.

Testability: This pattern lets you substitute localStorage with a mock during testing, making it easier to control and
test interactions.
 */

import {Component, Directive, ElementRef, forwardRef, Inject, Injectable, InjectionToken} from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {
  }

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
}

/*
2. Injecting the Component’s DOM Element Using ElementRef

For scenarios requiring direct DOM manipulation, you can inject ElementRef, which represents a reference to the
underlying DOM element of a component or directive. This is particularly useful when applying styles, animations, or
working with third-party libraries that require DOM manipulation.
 */

/*
ElementRef: By injecting ElementRef, Angular provides direct access to the DOM element on which this directive is
applied.

Direct DOM Access: Here, we use nativeElement to apply a style.color property directly on the DOM element, setting it
to 'red'.

Use Cases: This pattern is typically used sparingly, as direct DOM manipulation can bypass Angular’s change detection.
However, it’s invaluable for custom visual effects or when working with libraries that manipulate the DOM directly.
 */

@Directive({
  standalone: true,
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private element: ElementRef) {
  }

  update() {
    this.element.nativeElement.style.color = 'red';
  }
}


/*
3. Resolving Circular Dependencies with forwardRef

In cases where two classes reference each other, or where a class needs to refer to itself in its providers array, a
circular dependency is created. forwardRef helps resolve these dependencies by providing a way to reference the class
before it’s defined.
 */

/*
Circular Dependency: Here, MenuItem refers to itself in the providers array by using forwardRef, which allows Angular
to resolve this dependency at runtime rather than compile time.

forwardRef Usage: Wrapping MenuItem in forwardRef(() => MenuItem) lets Angular defer the evaluation of MenuItem until
the code is executed, bypassing the circular dependency error.

Common Use Case: Circular dependencies can occur in hierarchical structures, such as parent-child components or
services with mutual dependencies.
 */

export const PARENT_MENU_ITEM = new InjectionToken<MenuItem>('ParentMenuItem');

@Component({
  selector: 'app-menu-item',
  template: '<p>Menu item</p>',
  standalone: true,
  providers: [
    {
      provide: PARENT_MENU_ITEM,
      useExisting: forwardRef(() => MenuItem)
    }
  ]
})
export class MenuItem {
  constructor(@Inject(PARENT_MENU_ITEM) private parent: MenuItem) {
  }
}

