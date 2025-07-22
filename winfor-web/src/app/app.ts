import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('winfor-web');

  constructor(public authenticationService: AuthenticationService) { }

  async login() {
    await this.authenticationService.login();
  }

  async logout() {
    await this.authenticationService.logout();
  }
}
