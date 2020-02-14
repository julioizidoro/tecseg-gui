import { Component, OnInit } from '@angular/core';
import { Estoque } from 'src/app/estoque/model/estoque';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-cadproduto',
  templateUrl: './cadproduto.component.html',
  styleUrls: ['./cadproduto.component.scss']
})
export class CadprodutoComponent implements OnInit {

  estoque: Estoque;
   formulario: FormGroup;
   unidade: string;
   materiaprima : boolean;
   
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private estoqueService: EstoqueService,
  ) { }

  ngOnInit() {
    this.estoque = this.estoqueService.getEstoque();
    if (this.estoque == null) {
      this.estoque = new Estoque();
      this.estoque.produto = new Produto();
      this.formulario = this.formBuilder.group({
        idestoque: [null],
        quantidadeestoque: 0,
        quantidademinima: 0,
        produto: this.formBuilder.group({
          idpoduto: [null],
          descricao: [null],
          unidade: [null],
        }),
      });
    } else {
      this.formulario = this.formBuilder.group({

        idestoque: this.estoque.idestoque,
        quantidadeestoque: this.estoque.quantidadeestoque,
        quantidademinima: this.estoque.quantidademinima,
        produto: this.formBuilder.group({
          idpoduto: this.estoque.produto.idproduto,
          descricao: this.estoque.produto.descricao,
          unidade: this.estoque.produto.unidade,
        }),
      });
    }
    
  }

  setUnidade() {
    this.unidade = this.formulario.get('produto.unidade').value;
  }

  setMateriaPrima() {
   this.materiaprima = this.formulario.get('produto.materiaprima').value;
  }

  salvar() {
    this.estoque = this.formulario.value;
    this.estoque.produto.unidade = this.unidade;
    if (this.estoque.quantidadeestoque == null) {
      this.estoque.quantidadeestoque = 0;
    }
    if (this.estoque.quantidademinima == null) {
      this.estoque.quantidademinima = 0;
    }
    this.estoqueService.salvar( this.estoque).subscribe(
      resposta => {
        this.estoque = resposta as any;
        this.estoqueService.setEstoque(null);
        this.router.navigate(['/consproduto']);
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  cancelar() {
    this.estoqueService.setEstoque(null);
    this.router.navigate([ '/consproduto']);
  }
}

