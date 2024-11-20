/*
1. Using the RouterLink Directive with Link Parameters Array in Templates
When you want to navigate to a route with parameters directly in a template, you can use the routerLink directive with
an array syntax. This allows you to define each segment of the route and pass dynamic values as needed.

In this example:

'/user' is the base path.
userId is a dynamic parameter passed as part of the path.
'profile' is a sub-path.
If userId = 123, this will navigate to /user/123/profile.

Query Parameters in RouterLink
To add query parameters with a link parameters array, use the queryParams attribute along with routerLink:

This will navigate to /search?query=angular&page=2.

 */

// <a [routerLink]="['/user', userId, 'profile']">Go to User Profile</a>

// <a [routerLink]="['/search']" [queryParams]="{ query: 'angular', page: 2 }">Search</a>

/*
2. Using the Router Service to Navigate with Link Parameters Array
When navigating programmatically in a component or service, use Angular’s Router service. This is especially useful for
dynamic navigation based on conditions or events.

Here, this.router.navigate(['/user', userId, 'profile']) constructs a dynamic URL based on userId and navigates to
/user/:userId/profile.

Adding Query Parameters in Router.navigate()
You can also add query parameters and fragments with the Router.navigate method:

This will navigate to /search?query=angular&page=2#section1.

 */

import {Router} from '@angular/router';
import {Component} from "@angular/core";

@Component({
    selector: 'app-user-profile',
    template: ``,
    standalone: true
})
export class UserProfileComponent {
    constructor(private router: Router) {
    }

    goToProfile(userId: number) {
        this.router.navigate(['/user', userId, 'profile']);
    }

    goToSearch() {
        this.router.navigate(['/search'], {
            queryParams: {query: 'angular', page: 2},
            fragment: 'section1'
        });
    }

}

/*
3. Navigating with Relative Paths
You can specify relative paths when using link parameters. This is useful for navigating to a route that is relative to
the current route.

This code navigates to a profile route relative to the current route. Here, this.route is an instance of ActivatedRoute.
 */

// this.router.navigate(['profile'], { relativeTo: this.route });


/*
4. Link Parameters Array Format
The link parameters array generally follows this format:

['/basePath', parameter1, 'subPath', parameter2, ...]

 */


/*
foo://example.com:8042/over/there?name=ferret#nose
\_/   \______________/\_________/ \_________/ \__/
 |           |            |            |        |
scheme    authority      path        query   fragment
 */
