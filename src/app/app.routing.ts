import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './usuario/login/login.component';


const APP_ROUTER: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER);
