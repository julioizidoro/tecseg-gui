import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfastamentoService } from './afastamento.service';
import { CadafastamentoComponent } from './cadafastamento/cadafastamento.component';
import { ConsafastamentoComponent } from './consafastamento/consafastamento.component';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';
import { AccordionModule } from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { routing } from '../app.routing';



@NgModule({
  declarations: [CadafastamentoComponent, ConsafastamentoComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TextMaskModule,
    routing,
  ], 
  providers: [
    AfastamentoService,
  ],
  exports: [CadafastamentoComponent, ConsafastamentoComponent],
  
  
})
export class AfastamentoModule { }
