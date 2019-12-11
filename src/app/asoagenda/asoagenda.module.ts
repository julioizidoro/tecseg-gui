import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadasoagendaComponent } from './cadasoagenda/cadasoagenda.component';
import { ConsasoagendaComponent } from './consasoagenda/consasoagenda.component';
import { TextMaskModule } from 'angular2-text-mask';
import {DropdownModule} from 'primeng/dropdown';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AsoagendaService } from './asoagenda.service';


@NgModule({
  declarations: [CadasoagendaComponent, ConsasoagendaComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TextMaskModule,
  ],
  exports:  [CadasoagendaComponent, ConsasoagendaComponent],
  providers: [  
    AsoagendaService,
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]  

})
export class AsoagendaModule { }
