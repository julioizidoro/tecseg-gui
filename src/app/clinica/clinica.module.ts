import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaService } from './clinica.service';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { routing } from '../app.routing';
import { CadpagtoComponent } from './clinicapagto/cadpagto/cadpagto.component';
import { ConsComponent } from './clinicapagto/cons/cons.component';

@NgModule({
  declarations: [ConsComponent, CadpagtoComponent],
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
  exports: [ConsComponent],
  providers: [
    ClinicaService,
  ]
})
export class ClinicaModule { }
