import { Component, OnInit } from '@angular/core';
import { Historicosituacao } from '../model/historicosituacao';
import { Codigoafastamento } from '../model/codigoafastamento';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AfastamentoService } from '../afastamento.service';
import { Router } from '@angular/router';
import { LojaService } from 'src/app/loja/loja.service';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Loja } from 'src/app/loja/model/loja';

@Component({
  selector: 'app-consafastamento',
  templateUrl: './consafastamento.component.html',
  styleUrls: ['./consafastamento.component.scss']
})
export class ConsafastamentoComponent implements OnInit {

  listaHistorico: Historicosituacao[];
  listaCodigo: Codigoafastamento[];
  codigoAfastamento: Codigoafastamento;
  isFirstOpen = false;
  oneAtATime: true;
  formulario: FormGroup;
  lojas: Loja[];
  lojaSelecionada: Loja;
  funcoes: Funcao[];
  funcaoSelecionada: Funcao;
  

  constructor(
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private funcaoService: FuncaoService,
    private router: Router,
    private afastamentoService: AfastamentoService,
  ) { }

  ngOnInit(): void {
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      datainicial: Date,
      datafinal: Date,
      funcao: [null],
      codigo: [null],
    });
    this.funcaoSelecionada = null;
    this.lojaSelecionada = null;
    this.codigoAfastamento = null;
  }

  carregarComboBox() {
    this.funcaoService.listar().subscribe(resposta => {
      this.funcoes = resposta as any;
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );
    this.afastamentoService.listar('@').subscribe(resposta => {
      this.listaCodigo = resposta as any;
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get('loja').value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setFuncao() {
    this.funcaoSelecionada = this.formulario.get('funcao').value;
  }

  compararCodigo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setCodigo() {
    this.codigoAfastamento = this.formulario.get('codigo').value;
  }

  consultar() {
    this.afastamentoService.listarHistorico().subscribe(
      resposta => {
        this.listaHistorico = resposta as any;
      },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );
}

pesquisarLimpar(){
  this.formulario.reset();
  this.consultar();
}

pesquisar(){

}

editar(historico: Historicosituacao) {
  this.afastamentoService.setHistorico(historico);
  this.router.navigate(['/consafastamento']);
}

}
