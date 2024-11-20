/*
In Angular, route guards provide a way to control access to routes, helping to secure an application by restricting
access to authorized users, managing navigation permissions, and improving the user experience by resolving data
before entering a route.
 */

/*
1. canActivate: Guarding Initial Route Access
The canActivate guard is used to prevent unauthorized users from accessing specific routes. This is typically used to
protect routes that require authentication.
 */

import {Component, Injectable, OnInit} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  CanMatch,
  Resolve,
  Route,
  Router,
  RouterStateSnapshot,
  Routes,
  UrlSegment
} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  standalone: true,
})
export class ExampleComponent {
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardCanActivate implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    const isAuthenticated = true; /* logic to check if user is authenticated */
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

const routes: Routes = [
  {
    path: 'dashboard',
    component: ExampleComponent,
    canActivate: [AuthGuardCanActivate],
  },
];

/*
2. canActivateChild: Guarding Child Routes
The canActivateChild guard controls access to a route’s children. This is useful when you want to apply the same guard
to all child routes.
 */

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  standalone: true,
})
export class AdminComponent {
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardCanActivateChild implements CanActivateChild {
  canActivateChild(): boolean {
    const isAuthenticated = true; /* logic to check if user is authenticated */
    return isAuthenticated;
  }
}

const routes2: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AuthGuardCanActivateChild],
    children: [{path: 'example', component: ExampleComponent}],
  },
];

/*
3. canDeactivate: Confirming Navigation Away from a Route
The canDeactivate guard is used to prevent users from leaving a route, typically if there are unsaved changes.
*/

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

const routes3: Routes = [
  {path: 'form', component: ExampleComponent, canDeactivate: [CanDeactivateGuard]}
];


/*
4. canLoad: Loading Modules Conditionally
The canLoad guard is used to prevent the loading of a lazy-loaded module unless specific conditions are met. This guard
is useful for blocking unauthorized users from even downloading module files.
 */

@Injectable({
  providedIn: 'root',
})
export class AuthGuardCanLoad implements CanLoad {
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const isAuthenticated = true/* logic to check if user is authenticated */;
    return isAuthenticated;
  }
}

const path = './admin/admin.module';
const routes4: Routes = [
  {
    path: 'admin',
    loadChildren: () => import(path).then(m => m.AdminModule),
    canLoad: [AuthGuardCanLoad]
  }
];


/*
5. canMatch: Conditionally Matching Routes
canMatch guards routes based on specific criteria, allowing you to match certain routes based on dynamic or complex
conditions.
 */

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanMatch {
  canMatch(route: Route, segments: UrlSegment[]): boolean {
    const hasRole = true/* logic to check user role */;
    return hasRole;
  }
}

const routes5: Routes = [
  {path: 'premium', component: ExampleComponent, canMatch: [RoleGuard]}
];


/*
6. resolve: Preloading Route Data
The resolve guard allows you to fetch data before a route is activated, ensuring the data is available immediately when
the component loads.
 */

@Injectable({
  providedIn: 'root',
})
export class DataResolver implements Resolve<any> {
  resolve(): Observable<any> {
    return new Observable()/* Observable that fetches data */;
  }
}

export class DetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
    });
  }
}

const routes6: Routes = [
  {path: 'details', component: DetailsComponent, resolve: {data: DataResolver}}
];


/*
Since some are marked deprecated
 */

export const yourGuardFunction: (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => void = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  // your  logic goes here
}

const routes7: Routes = [
  {
    path: '/your-path',
    component: ExampleComponent,
    canActivate: [yourGuardFunction],
  }
];
