/*
2. Stack Frame Context (e.g., Guards)
Some Angular functions, such as router guards, operate within an injection context. This allows these functions to use
the inject function directly to obtain dependencies. For example, CanActivateFn allows you to inject services or tokens
within the guard function.
 */


export class PermissionsService {
  canActivate(userToken: UserToken, param: any) {
    return undefined;
  }
}

export class UserToken {
}

import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core/";

const canActivateTeam: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // Injecting PermissionsService and UserToken within guard
  const permissionsService = inject(PermissionsService);
  const userToken = inject(UserToken);

  return permissionsService.canActivate(userToken, route.params['id']);
};

