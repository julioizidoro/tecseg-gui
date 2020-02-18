import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadcontasComponent } from './cadcontas/cadcontas.component';
import { ConscontasComponent } from './conscontas/conscontas.component';
import { ContasService } from './contas.service';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { routing } from '../app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CadcontasComponent, ConscontasComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    DropdownModule,
    AccordionModule.forRoot(),
    FormsModule
  ],
  exports: [CadcontasComponent, ConscontasComponent],
  providers: [ContasService]
})
export class ContasModule { }
