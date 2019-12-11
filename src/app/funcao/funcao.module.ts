import { LojaService } from './../loja/loja.service';
import { FuncaoService } from './funcao.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    FuncaoService,
    LojaService,
  ]
})
export class FuncaoModule { }
