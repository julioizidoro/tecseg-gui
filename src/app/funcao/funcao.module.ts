
import { FuncaoService } from './funcao.service';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadfuncaoComponent } from './cadfuncao/cadfuncao.component';
import { ConsfuncaoComponent } from './consfuncao/consfuncao.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AccordionModule } from 'ngx-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routing } from 'src/app.routing';

@NgModule({
  declarations: [CadfuncaoComponent, ConsfuncaoComponent],
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
    CadfuncaoComponent, ConsfuncaoComponent
  ],
  providers: [
    FuncaoService,
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class FuncaoModule { }
