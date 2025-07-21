import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    const authConfig: AuthConfig = {
      // issuer: 'http://keycloak:8080/',
      // TODO: tornar configurável
      issuer: 'http://localhost:8090/realms/winfor',
      redirectUri: window.location.origin,
      clientId: 'winfor-app',
      requireHttps: false,
      responseType: 'code',
      scope: 'openid profile email',
      showDebugInformation: true,
      strictDiscoveryDocumentValidation: false,
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
