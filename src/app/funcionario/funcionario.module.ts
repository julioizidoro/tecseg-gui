import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadfuncionarioComponent } from './cadfuncionario/cadfuncionario.component';
import { ConsfuncionarioComponent } from './consfuncionario/consfuncionario.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { TextMaskModule } from 'angular2-text-mask';
import { LojaService } from '../loja/loja.service';
import { FuncionarioService } from './funcionario.service';
import { FuncaoService } from '../funcao/funcao.service';
import { AccordionModule } from 'ngx-bootstrap';
import { routing } from 'src/app.routing';

@NgModule({
  declarations: [CadfuncionarioComponent, ConsfuncionarioComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TextMaskModule,
    AccordionModule.forRoot(),
    routing,
  ],
  providers:[
    FuncionarioService,
    FuncaoService,
    LojaService,
  ],
  exports: [CadfuncionarioComponent, ConsfuncionarioComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuncionarioModule { }
