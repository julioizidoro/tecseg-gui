import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadasocontroleComponent } from './cadasocontrole/cadasocontrole.component';
import { ConsasocontroleComponent } from './consasocontrole/consasocontrole.component';
import { ListaasofuncionarioComponent } from './listaasofuncionario/listaasofuncionario.component';
import { TextMaskModule } from 'angular2-text-mask';
import {DropdownModule} from 'primeng/dropdown';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AsocontroleService } from './asocontrole.service';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { FuncaoService } from '../funcao/funcao.service';
import { AsotipoService } from './asotipo.service';


@NgModule({
  declarations: [CadasocontroleComponent, ConsasocontroleComponent, ListaasofuncionarioComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TextMaskModule,
  ],
  exports: [CadasocontroleComponent, ConsasocontroleComponent, ListaasofuncionarioComponent],
  providers: [
    AsocontroleService,
    FuncaoService,
    AsotipoService,
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AsocontroleModule { }
