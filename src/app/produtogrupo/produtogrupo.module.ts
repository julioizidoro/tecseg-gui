import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadprodutogrupoComponent } from './cadprodutogrupo/cadprodutogrupo.component';
import { ConsprodutogrupoComponent } from './consprodutogrupo/consprodutogrupo.component';
import { ProdutogrupoService } from './produtogrupo.service';



@NgModule({
  declarations: [CadprodutogrupoComponent, ConsprodutogrupoComponent],
  imports: [
    CommonModule
  ],
  providers: [ProdutogrupoService]
})
export class ProdutogrupoModule { }
