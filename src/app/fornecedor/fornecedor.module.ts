import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadfornecedorComponent } from './cadfornecedor/cadfornecedor.component';
import { ConsfornecedorComponent } from './consfornecedor/consfornecedor.component';
import { DropdownModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { routing } from '../app.routing';
import { AccordionModule } from 'ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from '../clientes/clientes.service';



@NgModule({
  declarations: [CadfornecedorComponent, ConsfornecedorComponent],
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
  exports : [CadfornecedorComponent, ConsfornecedorComponent],
  providers : [ClientesService]
})
export class FornecedorModule { }
