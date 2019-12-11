import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../model/funcionario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { Funcao } from 'src/app/funcao/model/funcao';
import { FuncionarioService } from '../funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LojaService } from 'src/app/loja/loja.service';
import { FuncaoService } from 'src/app/funcao/funcao.service';

@Component({
  selector: 'app-consfuncionario',
  templateUrl: './consfuncionario.component.html',
  styleUrls: ['./consfuncionario.component.scss']
})
export class ConsfuncionarioComponent implements OnInit {

  formulario: FormGroup;
  lojas: Loja[];
  lojaSelecionada: Loja;
  funcoes: Funcao[];
  funcaoSelecionada: Funcao;
  habilitarConsulta: boolean;
  isFirstOpen = false;
  oneAtATime = true;
  bsInlineValue = new Date();
  rotaAnterior: string;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private funcaoService: FuncaoService,
    private activeRrouter: ActivatedRoute) {
      this.consultar();
    }

    funcionarios: Funcionario[];


  ngOnInit() {
    this.activeRrouter.params.subscribe(params => {
      this.habilitarConsulta = params.habilita;
      this.rotaAnterior = params.rota;
    });
    this.habilitarConsulta = true;
    this.rotaAnterior = 'asocontrole';
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      funcao: [null],
      situacao: [null],
    });

  }

  carregarComboBox() {
    this.funcaoService.listar().subscribe(resposta => {
      this.funcoes = resposta as any;
    });
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
  }
    consultar() {
      this.funcionarioService.listar('@', '@').subscribe(
        resposta => {
          this.funcionarios = resposta as any;
        }
      );
  }

  editar(funcionario: Funcionario) {
    this.router.navigate([ '/cadfuncionario' ,   funcionario.idfuncionario ]);
  }

  pesquisar() {
    let nomePesquisa = this.formulario.get('nome').value;
    if (nomePesquisa == null) {
      nomePesquisa = '@';
    }
    if ((nomePesquisa.length > 0) && (this.funcaoSelecionada == null) && (this.lojaSelecionada == null)) {
      this.pesquisarNome(nomePesquisa);
    } else if ((this.lojaSelecionada != null) && (this.funcaoSelecionada != null)) {
      this.pesquisarFuncionarioFuncaoLoja(nomePesquisa);
    } else if (this.funcaoSelecionada != null) {
        this.pesquisarFuncao(nomePesquisa);
    } else if (this.lojaSelecionada != null) {
          this.pesquisarLoja(nomePesquisa);
    } else {
      this.pesquisarNome(nomePesquisa);
    }
}

  pesquisarNome(nomePesquisa: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.listar(nomePesquisa, situacao).subscribe(
      resposta => {
        this.funcionarios = resposta as any;
      }
    );
  }

  pesquisarLoja(nomePesquisa: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.getFuncionarioLoja(this.lojaSelecionada.idloja, nomePesquisa, situacao).subscribe(
      resposta => {
        this.funcionarios = resposta as any;
      }
    );
  }

  pesquisarFuncao(nomePesquisa: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.getFuncionarioFuncao(this.funcaoSelecionada.idfuncao, nomePesquisa, situacao).subscribe(
      resposta => {
        this.funcionarios = resposta as any;
      }
    );
  }

  pesquisarFuncionarioFuncaoLoja(nomePesquisa: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.getFuncionarioFuncaoLoja(this.lojaSelecionada.idloja,
      this.funcaoSelecionada.idfuncao, nomePesquisa, situacao ).subscribe(
      resposta => {
        this.funcionarios = resposta as any;
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

  pesquisarLimpar() {
    this.formulario.reset();
    this.funcaoSelecionada = null;
    this.lojaSelecionada = null;
    this.consultar();
  }

  selecionarFuncionario(funcionarioConsulta: Funcionario) {
    this.funcionarioService.setFuncionario(funcionarioConsulta);
    if ( this.rotaAnterior === 'asoagenda') {
      this.router.navigate([ '/cadasoagenda' ]);
    } else if ( this.rotaAnterior === 'asocontrole') {
      this.router.navigate([ '/cadasocontrole']);
    }
  }

  getSituacao(funcionario: Funcionario) {
    if (funcionario.situacao='Ativo') {
      return true;
    } else return false;
  }
}
