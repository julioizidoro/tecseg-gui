import { CommonModule } from '@angular/common';
import { CadtreinamentoComponent } from './cadtreinamento/cadtreinamento.component';
import { ConstreinamentoComponent } from './constreinamento/constreinamento.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import {DropdownModule} from 'primeng/dropdown';
import { TreinamentoService } from './treinamento.service';
import { ConstipoComponent } from './tipo/constipo/constipo.component';
import { CadtipoComponent } from './tipo/cadtipo/cadtipo.component';
import { AccordionModule } from 'ngx-bootstrap';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListatreinamentoComponent } from './listatreinamento/listatreinamento.component';
import { VencidosComponent } from './vencidos/vencidos.component';

@NgModule({
  declarations: [CadtreinamentoComponent, ConstreinamentoComponent, ConstipoComponent, CadtipoComponent, ListatreinamentoComponent, VencidosComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TextMaskModule,
    AccordionModule.forRoot(),
  ],
  exports: [CadtreinamentoComponent, ConstreinamentoComponent, ConstipoComponent, CadtipoComponent, ListatreinamentoComponent,VencidosComponent],
  providers: [
    TreinamentoService,
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class TreinamentoModule { }
