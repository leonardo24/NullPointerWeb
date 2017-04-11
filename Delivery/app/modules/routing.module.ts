import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }   from '../services/auth-guard.service';

import { LoginComponent } from '../components/login.component';
import { ActividadComponent } from '../components/actividad.component';
import { PromocionComponent } from '../components/promocion.component';
import { ClienteComponent } from '../components/cliente.component';
import { DashboardComponent } from '../components/dashboard.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '',  pathMatch: 'full', redirectTo: 'clientes' },
      { path: 'clientes', component: ClienteComponent, canActivate: [AuthGuard] },
      { path: 'actividades', component: ActividadComponent, canActivate: [AuthGuard] },
      { path: 'promociones', component: PromocionComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [ ActividadComponent,
                                  PromocionComponent, 
                                  ClienteComponent, 
                                  DashboardComponent, 
                                  LoginComponent ];