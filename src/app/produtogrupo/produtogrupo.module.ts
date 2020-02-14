import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadprodutogrupoComponent } from './cadprodutogrupo/cadprodutogrupo.component';
import { ConsprodutogrupoComponent } from './consprodutogrupo/consprodutogrupo.component';



@NgModule({
  declarations: [CadprodutogrupoComponent, ConsprodutogrupoComponent],
  imports: [
    CommonModule
  ]
})
export class ProdutogrupoModule { }
