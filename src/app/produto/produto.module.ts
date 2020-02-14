import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadprodutoComponent } from './cadproduto/cadproduto.component';
import { ProdutoService } from './produto.service';
import { EstoqueService } from '../estoque/estoque.service';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ConsprodutoComponent } from './consproduto/consproduto.component';
import { AccordionModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [CadprodutoComponent, ConsprodutoComponent],
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
  exports: [CadprodutoComponent, ConsprodutoComponent],
  providers: [ProdutoService, EstoqueService]
})
export class ProdutoModule { }
