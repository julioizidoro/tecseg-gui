import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ConssalutarComponent } from './asocontrole/salutar/conssalutar/conssalutar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './usuario/login/login.component';
import { ConsfuncionarioComponent } from './funcionario/consfuncionario/consfuncionario.component';
import { CadfuncionarioComponent } from './funcionario/cadfuncionario/cadfuncionario.component';
import { ConsasocontroleComponent } from './asocontrole/consasocontrole/consasocontrole.component';
import { ListaasofuncionarioComponent } from './asocontrole/listaasofuncionario/listaasofuncionario.component';
import { CadasocontroleComponent } from './asocontrole/cadasocontrole/cadasocontrole.component';
import { ConsasoagendaComponent } from './asoagenda/consasoagenda/consasoagenda.component';
import { CadasoagendaComponent } from './asoagenda/cadasoagenda/cadasoagenda.component';
import { CadfuncaoComponent } from './funcao/cadfuncao/cadfuncao.component';
import { ConsfuncaoComponent } from './funcao/consfuncao/consfuncao.component';


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
  { path: 'conssalutar', component: ConssalutarComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER);
