/*
In Angular, the order of routes in the routing configuration is significant. Routes are evaluated from top to bottom,
so Angular will match the first route that fits the requested URL
 */

/*
1. Specific to Generic Route Order

Angular's router matches routes in the order they are defined in the array, so it’s best to:

Define specific routes first: Place more specific routes, with explicit paths, before generic routes.

Catch-all or wildcard routes last: Place catch-all routes (**) or less specific routes (like default paths or auxiliary
routes) at the end.
 */

import {Routes} from "@angular/router";
import {Component, ErrorHandler} from "@angular/core";
import {inject} from "@angular/core/";

@Component({
  selector: "app-routing-order",
  templateUrl: "./routing-order.html",
  styleUrls: ["./routing-order.scss"],
  standalone: true
})
export class RoutingOrderComponent {
}

const routes1: Routes = [
  {path: 'home', component: RoutingOrderComponent},
  {path: 'about', component: RoutingOrderComponent},
  {path: 'products/:id', component: RoutingOrderComponent},  // Specific route
  {path: 'products', component: RoutingOrderComponent},  // Less specific
  {path: '**', component: RoutingOrderComponent}  // Wildcard route, last
];

// Angular matches /products/123 to ProductDetailComponent because it's defined before /products.
// The wildcard route ** catches any route not matched by previous entries, so it’s placed last.


/*
3. Empty Path Routes (Default Route)

An empty path route (e.g., { path: '', component: HomeComponent }) acts as the default route and should be placed at the
top or in a suitable position to ensure it doesn’t interfere with other routes.

Here, pathMatch: 'full' ensures that it only matches the empty path exactly. Without this, it could match other routes
that begin with /, causing unexpected behavior.
 */

const routes2: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},  // Redirect for empty path
  {path: 'home', component: RoutingOrderComponent},
];


/*
4. Nested Routes
If you have nested routes (child routes), the order applies within each parent route’s children array as well. Angular
will match children routes in the order they're defined.

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: ':id', component: ProductDetailComponent }, // Specific child
      { path: '', component: ProductListComponent }       // Default child
    ]
  },
  ...
];

 */


/*
Auxiliary (Secondary) Routes

Auxiliary routes (or named outlets) should also follow an order. They are often defined within the primary route
definitions but make sure they don't interfere with each other by ordering them logically.

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, outlet: 'sidebar' }, // Auxiliary route
  ...
];

 */


/*
6. Guarded Routes

If you have route guards (like canActivate or canLoad), the order also matters, as Angular will evaluate routes in
order. Define routes with guards before unguarded ones to prevent unauthorized access paths.
 */


/*
Complex Redirects
 */

const routes: Routes = [
  {path: "first-component", component: RoutingOrderComponent},
  {
    path: "old-user-page",
    redirectTo: ({queryParams}) => {
      const errorHandler = inject(ErrorHandler);
      const userIdParam = queryParams['userId'];
      if (userIdParam !== undefined) {
        return `/user/${userIdParam}`;
      } else {
        errorHandler.handleError(new Error('Attempted navigation to user page without user ID.'));
        return `/not-found`;
      }
    },
  },
  {path: "user/:userId", component: RoutingOrderComponent},
];
