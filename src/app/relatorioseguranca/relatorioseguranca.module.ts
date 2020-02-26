import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsrelatorioComponent } from './relatorio/consrelatorio/consrelatorio.component';
import { CadrelatorioComponent } from './relatorio/cadrelatorio/cadrelatorio.component';
import { RelatoriosegurancaService } from './relatorioseguranca.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CaditemComponent } from './item/caditem/caditem.component';



@NgModule({
  declarations: [ConsrelatorioComponent, CadrelatorioComponent, CaditemComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    TextMaskModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    BrowserModule,
  ],
  exports: [ConsrelatorioComponent, CadrelatorioComponent],
  providers:[RelatoriosegurancaService]
})
export class RelatoriosegurancaModule { }
