/*
In Angular, relative paths are used to navigate between routes relative to the current active route. This is especially
useful in nested routing structures, where components in child routes need to navigate to sibling or parent routes.
 */

/*
1. Understanding Relative vs. Absolute Paths
Absolute Path: Starts from the root (/) of the application, regardless of the current route. Example: /dashboard.
Relative Path: Relative to the current active route. Uses ./ or ../ to refer to the current route or move up in the
route hierarchy.

2. Navigating with Relative Paths
You can navigate using relative paths in Angular by configuring the Router service’s navigate method with an array of
route segments and the { relativeTo: this.route } option. Here, this.route is the ActivatedRoute instance.

3. Path Symbols in Relative Paths
.: Refers to the current route level.
..: Moves up one level in the route hierarchy.

Examples:
this.router.navigate(['./child'], { relativeTo: this.route }): Stays at the current level and navigates to child.
this.router.navigate(['../parent'], { relativeTo: this.route }): Moves up one level and navigates to parent.
this.router.navigate(['../../anotherParent'], { relativeTo: this.route }): Moves up two levels to navigate to anotherParent.
 */

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="goToSibling()">Go to Sibling</button>
    <button (click)="goToParent()">Go to Parent</button>
  `,
  standalone: true
})
export class ExampleComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  goToSibling() {
    this.router.navigate(['../sibling'], {relativeTo: this.route});
  }

  goToParent() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

/*
this.router.navigate(['../sibling'], { relativeTo: this.route }) navigates to a sibling route of the current route.
this.router.navigate(['../'], { relativeTo: this.route }) navigates to the parent route.
 */

/*
4. Navigating Using Router Links in Templates
You can use relative paths with [routerLink] in your templates, which is helpful when defining links directly in HTML.

['../sibling']: Moves up one level and navigates to the sibling route.
['../../parent']: Moves up two levels and navigates to the parent route.
['./child']: Stays at the current level and navigates to the child route.
 */

// <!-- Links within the same component template -->
// <a [routerLink]="['../sibling']" [queryParams]="{ id: 1 }">Sibling</a>
// <a [routerLink]="['../../parent']">Parent</a>
// <a [routerLink]="['./child']">Child</a>


/*
6. Using Nested Routes and Relative Paths
In a nested route setup, child components use relative paths to navigate within the hierarchy. For example:

7. Handling Query Parameters with Relative Paths
You can also include query parameters and fragments in relative path navigation.
 */

// const routes: Routes = [
//   {
//     path: 'parent',
//     component: ParentComponent,
//     children: [
//       { path: 'child1', component: Child1Component },
//       { path: 'child2', component: Child2Component },
//       { path: 'child3', component: Child3Component }
//     ]
//   }
// ];

// Within Child1Component, you can navigate to Child2Component or Child3Component using relative paths:
// this.router.navigate(['../child2'], { relativeTo: this.route });
// this.router.navigate(['../child3'], { relativeTo: this.route });

// this.router.navigate(['../sibling'], {
//   relativeTo: this.route,
//   queryParams: { id: 2 },
//   fragment: 'details'
// });
