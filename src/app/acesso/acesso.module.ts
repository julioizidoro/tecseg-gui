import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadacessoComponent } from './cadacesso/cadacesso.component';
import { ConsacessoComponent } from './consacesso/consacesso.component';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule } from '@angular/common/http';
import { AcessoService } from './acesso.service';

@NgModule({
  declarations: [
    CadacessoComponent,
    ConsacessoComponent,
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    HttpClientModule,
  ],
  exports: [
    CadacessoComponent,
    ConsacessoComponent,
  ],
  providers: [
    AcessoService,
  ]
})
export class AcessoModule { }
