import { canActivateAuthRole } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import {
  EditarUsuarioComponent,
  ListaUsuariosComponent,
  CriarUsuarioComponent,
} from './usuario';
import {
  ListaCursosComponent,
} from './cursos';
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
  {
    path: 'usuarios/editar/:userId',
    component: EditarUsuarioComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'admin_winfor'}
  },
  {
    path: 'cursos',
    component: ListaCursosComponent,
    canActivate: [canActivateAuthRole],
    data: { allowedRoles: ['admin_winfor', 'coordenador_cursos'] },
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
