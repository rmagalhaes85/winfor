import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { AuthService } from './auth.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('winfor-web');

  constructor(public keycloakService: KeycloakService) { }

  async login() {
    await this.keycloakService.login();
  }

  async logout() {
    await this.keycloakService.logout();
  }
}
