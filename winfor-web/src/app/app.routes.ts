import { canActivateAuthRole } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import {
  ListaUsuariosComponent,
  CriarUsuarioComponent,
} from './usuario';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'usuarios',
    component: ListaUsuariosComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'admin_winfor' }
  },
  {
    path: 'usuarios/criar',
    component: CriarUsuarioComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'admin_winfor' }
  },
//  Exemplos:
//  -------
//  { path: '', component: HomeComponent }, // Public route
//  {
//    path: 'protected',
//    component: ProtectedComponent,
//    canActivate: [AuthGuard], // Protect this route with our guard
//    data: { roles: ['app-user'] } // Define required roles for this route
//  },
];
