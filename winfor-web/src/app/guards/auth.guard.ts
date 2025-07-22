// adaptado de resultado gerado via ChatGPT
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override router: Router,
    protected keycloakService: KeycloakService
  ) {
    super(router, keycloakService);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloakService.login({
        redirectUri: window.location.origin + state.url
      });
      return false; // Prevent navigation until login completes
    }

    // Get the required roles from the route data
    const requiredRoles = route.data['roles'];

    // Check if the user has any of the required roles
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required, allow access
    }

    // Check if the user has at least one of the required roles
    const hasRequiredRole = requiredRoles.some((role: string) => this.keycloakService.isUserInRole(role));

    if (this.authenticated && hasRequiredRole) {
      return true; // User is authenticated and has the required role
    } else {
      // User is authenticated but doesn't have the required role
      // Optionally, redirect to an unauthorized page
      console.warn('Usuário não possui os roles necessários para acessar esta rota.');
      // Example: this.router.navigate(['/unauthorized']);
      return false; // Deny access
    }
  }
}
