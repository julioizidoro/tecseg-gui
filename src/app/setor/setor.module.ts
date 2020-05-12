import { SetorService } from './setor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadsetorComponent } from './cadsetor/cadsetor.component';
import { ConssetorComponent } from './conssetor/conssetor.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AccordionModule } from 'ngx-bootstrap';
import { routing } from '../app.routing';



@NgModule({
  declarations: [
    CadsetorComponent, 
    ConssetorComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    AccordionModule.forRoot(),
    FormsModule,
    routing,
  ],
  exports: [
    CadsetorComponent, 
    ConssetorComponent
  ],
  providers: [
    SetorService,
  ]
})
export class SetorModule { }
