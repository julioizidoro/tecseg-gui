import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadtreinamentoComponent } from './cadtreinamento/cadtreinamento.component';
import { ConstreinamentoComponent } from './constreinamento/constreinamento.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import {DropdownModule} from 'primeng/dropdown';
import { TreinamentoService } from './treinamento.service';

@NgModule({
  declarations: [CadtreinamentoComponent, ConstreinamentoComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TextMaskModule,
  ], 
  providers: [
    TreinamentoService,
  ]
})
export class TreinamentoModule { }
