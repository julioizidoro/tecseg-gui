import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadclienteComponent } from './cadclientes/cadcliente.component';
import { ConsclienteComponent } from './consclientes/conscliente.component';
import { ClientesService } from './clientes.service';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AccordionModule } from 'ngx-bootstrap';
import { routing } from '../app.routing';



@NgModule({
  declarations: [CadclienteComponent, ConsclienteComponent],
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
  exports: [
    CadclienteComponent, ConsclienteComponent
  ], 
  providers:[
    ClientesService
  ]
})
export class ClientesModule { }
