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
import { CadsalutarComponent } from './asocontrole/salutar/cadsalutar/cadsalutar.component';
import { VissalutarComponent } from './asocontrole/salutar/vissalutar/vissalutar.component';
import { CadtipoComponent } from './treinamento/tipo/cadtipo/cadtipo.component';
import { ConstipoComponent } from './treinamento/tipo/constipo/constipo.component';
import { ConstreinamentoComponent } from './treinamento/constreinamento/constreinamento.component';
import { CadtreinamentoComponent } from './treinamento/cadtreinamento/cadtreinamento.component';
import { ListatreinamentoComponent } from './treinamento/listatreinamento/listatreinamento.component';
import { ConsclienteComponent } from './clientes/consclientes/conscliente.component';
import { CadclienteComponent } from './clientes/cadclientes/cadcliente.component';
import { CadfornecedorComponent } from './fornecedor/cadfornecedor/cadfornecedor.component';
import { ConsfornecedorComponent } from './fornecedor/consfornecedor/consfornecedor.component';
import { CadprodutoComponent } from './produto/cadproduto/cadproduto.component';
import { ConsprodutoComponent } from './produto/consproduto/consproduto.component';


const APP_ROUTER: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'consfuncionario', component: ConsfuncionarioComponent },
  { path: 'cadfuncionario', component: CadfuncionarioComponent },
  { path: 'consasocontrole', component: ConsasocontroleComponent },
  { path: 'listaaso', component: ListaasofuncionarioComponent },
  { path: 'cadasocontrole', component: CadasocontroleComponent },
  { path: 'consasoagenda', component: ConsasoagendaComponent },
  { path: 'cadasoagenda', component: CadasoagendaComponent },
  { path: 'cadfuncao', component: CadfuncaoComponent },
  { path: 'consfuncao', component: ConsfuncaoComponent },
  { path: 'conssalutar', component: ConssalutarComponent },
  { path: 'cadsalutar', component: CadsalutarComponent },
  { path: 'cadtreinamentotipo', component: CadtipoComponent },
  { path: 'constreinamentotipo', component: ConstipoComponent },
  { path: 'vissalutar', component: VissalutarComponent },
  { path: 'constreinamento', component: ConstreinamentoComponent },
  { path: 'cadtreinamento', component: CadtreinamentoComponent },
  { path: 'listatreinamento', component: ListatreinamentoComponent },
  { path: 'cadclientes', component: CadclienteComponent },
  { path: 'consclientes', component: ConsclienteComponent },
  { path: 'cadfornecedor', component: CadfornecedorComponent },
  { path: 'consfornecedor', component: ConsfornecedorComponent },
  { path: 'consproduto', component: ConsprodutoComponent },
  { path: 'cadproduto', component: CadprodutoComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER);
