import { Component, OnInit } from '@angular/core';
import { Estoque } from 'src/app/estoque/model/estoque';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consproduto',
  templateUrl: './consproduto.component.html',
  styleUrls: ['./consproduto.component.scss']
})
export class ConsprodutoComponent implements OnInit {

  listaEstoque: Estoque[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private estoqueService: EstoqueService,
) { }

ngOnInit() {
  this.formulario = this.formBuilder.group({
    codigo: [null],
    descricao: [null],
  });
  this.consultar();
}

consultar() {
  console.log('inicio');
  this.estoqueService.listarProdutoDescricao('@').subscribe(
    resposta => {
      this.listaEstoque = resposta as any;
    }
  );
}

pesquisar() {
  let codigo : number = this.formulario.get('codigo').value;
  if (codigo!= null){
    this.estoqueService.pesquisarIdProduto(codigo).subscribe(
      resposta => {
        this.listaEstoque = resposta as any;
      }
    );  
  } else {
    let descricao = this.formulario.get('descricao').value;
    if (codigo!= null){
      this.estoqueService.listarProdutoDescricao(descricao).subscribe(
        resposta => {
          this.estoqueService = resposta as any;
        }
      );  
    } else {
      let codigoBarras = this.formulario.get('codgiobarras').value;
      if (codigoBarras!= null){
        this.estoqueService.listarProdutoCodigoBarras(codigoBarras).subscribe(
          resposta => {
            this.listaEstoque = resposta as any;
          }
       );
      }  
    }
  }
}


editar( estoque: Estoque) {
    this.estoqueService.setEstoque(estoque); 
    this.router.navigate(['/cadproduto']);
}


}
