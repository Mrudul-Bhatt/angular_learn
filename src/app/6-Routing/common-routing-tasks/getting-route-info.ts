/*
In Angular, you can access route information using the ActivatedRoute and Router services. These services provide
various properties and methods to get route details like parameters, query parameters, route data, and more.
 */

/*
1. Injecting ActivatedRoute and Router Services
To get route information, first inject ActivatedRoute and Router in your component's constructor:

2. Getting Route Parameters
Route parameters are part of the URL path and are defined with :paramName in your route configuration
(e.g., /product/:id). You can access route parameters using the paramMap observable or snapshot of ActivatedRoute.

3. Getting Query Parameters
Query parameters are key-value pairs in the URL after a question mark (e.g., /product?id=123&name=abc). You can access
query parameters similarly using queryParamMap or snapshot.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  standalone: true
})
export class ExampleComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    // Use the ActivatedRoute service to get route information here
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // 'id' is the parameter name
      console.log('Product ID:', id);
    });

    this.route.queryParamMap.subscribe(queryParams => {
      const id = queryParams.get('id');
      const name = queryParams.get('name');
      console.log('Query Params:', {id, name});
    });
  }
}


/*
4. Getting Route Data
Route data can be passed in the route configuration and accessed with ActivatedRoute. This is often used to provide
static data to routes.

5. Accessing the Route Path and URL
You can access the current route's full path and URL information using ActivatedRoute and Router.

6. Checking Route Information Across Navigations
To listen for route changes, you can subscribe to the Router events:

7. Combining Route Parameters, Query Parameters, and Data
You can combine multiple route information sources in one subscription using combineLatest (from RxJS):
 */


// const routes: Routes = [
//   {
//     path: 'product/:id',
//     component: ProductComponent,
//     data: { title: 'Product Details' }
//   }
// ];

// ngOnInit() {
//   this.route.data.subscribe(data => {
//     const title = data['title'];
//     console.log('Route Data:', title);
//   });
// }

// ngOnInit() {
//   console.log('Full URL:', this.router.url);
// }

// ngOnInit() {
//   this.router.events.subscribe(event => {
//     if (event instanceof NavigationEnd) {
//       console.log('Navigated to URL:', event.url);
//     }
//   });
// }

// ngOnInit() {
//   combineLatest([
//     this.route.paramMap,
//     this.route.queryParamMap,
//     this.route.data
//   ]).subscribe(([paramMap, queryParamMap, data]) => {
//     const id = paramMap.get('id');
//     const query = queryParamMap.get('search');
//     const title = data['title'];
//     console.log('Combined Route Info:', { id, query, title });
//   });
// }
