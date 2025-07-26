import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const allowedRoles: string[] = typeof(route.data['allowedRoles']) === 'string'
    ? [route.data['allowedRoles']] : route.data['allowedRoles'];
  console.log({allowedRoles});
  if (!allowedRoles) {
    return false;
  }

  const hasAllowedRole = (allowedRoles: string[]): boolean =>
    allowedRoles.some(role => Object.values(grantedRoles.realmRoles).includes(role));
    //Object.values(grantedRoles.realmRoles).some((roles) => roles.includes(role));

  if (authenticated && hasAllowedRole(allowedRoles)) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
