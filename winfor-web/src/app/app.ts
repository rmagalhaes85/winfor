import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
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
  sidebarOpen = false;
  sidebarVisible = true;

  //constructor(public auth: AuthService) {}
  constructor(public keycloakService: KeycloakService) {
    this.checkScreenSize();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (window.innerWidth >= 1024) {
      this.sidebarVisible = true;
      this.sidebarOpen = true; // Always open on large
    } else {
      this.sidebarVisible = true;
      this.sidebarOpen = false; // Hidden by default on small
    }
  }

  async login() {
    //this.auth.login();
    await this.keycloakService.login();
  }

  async logout() {
    //this.auth.logout();
    await this.keycloakService.logout();
  }
}
