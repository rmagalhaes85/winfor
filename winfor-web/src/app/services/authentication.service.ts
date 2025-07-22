// adaptado de resultado gerado via ChatGPT
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private keycloakService: KeycloakService) {}

  public async isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  public async getUserProfile(): Promise<KeycloakProfile | null> {
    return this.keycloakService.isLoggedIn() ? await this.keycloakService.loadUserProfile() : null;
  }

  public async getToken(): Promise<string | undefined> {
    return this.keycloakService.isLoggedIn() ? await this.keycloakService.getToken() : undefined;
  }

  public async getRoles(): Promise<string[]> {
    return this.keycloakService.getUserRoles(true);
  }

  public async login() {
    await this.keycloakService.login();
  }

  public async logout() {
    await this.keycloakService.logout();
  }

  public hasRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }
}
