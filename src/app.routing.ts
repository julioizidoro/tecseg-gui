import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { LoginComponent } from './app/usuario/login/login.component';
import { ConsfuncionarioComponent } from './app/funcionario/consfuncionario/consfuncionario.component';
import { CadfuncionarioComponent } from './app/funcionario/cadfuncionario/cadfuncionario.component';
import { ConsasocontroleComponent } from './app/asocontrole/consasocontrole/consasocontrole.component';
import { CadasocontroleComponent } from './app/asocontrole/cadasocontrole/cadasocontrole.component';
import { ListaasofuncionarioComponent } from './app/asocontrole/listaasofuncionario/listaasofuncionario.component';
import { ConsasoagendaComponent } from './app/asoagenda/consasoagenda/consasoagenda.component';
import { CadasoagendaComponent } from './app/asoagenda/cadasoagenda/cadasoagenda.component';
import { CadfuncaoComponent } from './app/funcao/cadfuncao/cadfuncao.component';
import { ConsfuncaoComponent } from './app/funcao/consfuncao/consfuncao.component';


const APP_ROUTER: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'consfuncionario', component: ConsfuncionarioComponent },
  { path: 'consfuncionario/:habilita/:rota', component: ConsfuncionarioComponent },
  { path: 'consfuncionario/:asos', component: ConsfuncionarioComponent },
  { path: 'cadfuncionario', component: CadfuncionarioComponent },
  { path: 'consasocontrole', component: ConsasocontroleComponent },
  { path: 'listaaso/:id', component: ListaasofuncionarioComponent },
  { path: 'cadasocontrole', component: CadasocontroleComponent },
  { path: 'consasoagenda', component: ConsasoagendaComponent },
  { path: 'cadasoagenda/:id/:rota', component: CadasoagendaComponent },
  { path: 'cadasoagenda/:rota', component: CadasoagendaComponent },
  { path: 'cadfuncao', component: CadfuncaoComponent },
  { path: 'consfuncao', component: ConsfuncaoComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER);
