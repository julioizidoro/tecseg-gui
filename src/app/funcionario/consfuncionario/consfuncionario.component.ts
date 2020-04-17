import { Component, OnInit, ViewChild } from '@angular/core';
import { Funcionario } from '../model/funcionario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { Funcao } from 'src/app/funcao/model/funcao';
import { FuncionarioService } from '../funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LojaService } from 'src/app/loja/loja.service';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { AsocontroleService } from 'src/app/asocontrole/asocontrole.service';
import { TreinamentoService } from 'src/app/treinamento/treinamento.service';
import { Treinamentoparticipante } from 'src/app/treinamento/model/treinamentoparticipante';
import { environment as env } from '../../../environments/environment.prod';
import { ModalDirective } from 'angular-bootstrap-md';
import { Setor } from 'src/app/setor/model/setor';
import { SetorService } from 'src/app/setor/setor.service';

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
  habilitarTreinamento: boolean;
  listaParticipante: Treinamentoparticipante[];
  idNaoParticipante: number;
  TaParticipando: boolean;
  numeroColaboradores: number;
  setores: Setor[];
  setorSelecionado: Setor;
  @ViewChild('termomascara') public showModalDataTermoMascaraOnClick: ModalDirective;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private funcaoService: FuncaoService,
    private asoControleService: AsocontroleService,
    private treinamentoService: TreinamentoService,
    private setorService: SetorService,
    ) {
      
    }

    funcionarios: Funcionario[];


  ngOnInit() {
    this.carregarComboBox();
    this.listaParticipante = [];
    if (this.funcionarioService.getRota() === 'treinamento' || this.funcionarioService.getRota() === 'listatreinamento') {
      this.idNaoParticipante = 0;
      const treinamento = this.treinamentoService.getTreinamento();
      this.treinamentoService.listarParticipante(this.treinamentoService.getTreinamento().idtreinamento).subscribe(
        resposta => {
          this.listaParticipante = resposta as any;
          
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      );
      this.habilitarTreinamento = true;
    } else {
      this.habilitarTreinamento = false;
    }
    this.habilitarConsulta = true;
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      funcao: [null],
      situacao: [null],
      sexo: [null],
      cor: [null],
      local: [null],
      setor: [null],
    });
    this.pesquisarNovo();

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
    this.setorService.listar().subscribe(
      resposta => {
        this.setores = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );

  }
    consultar() {
      this.funcionarioService.listar('@', '@').subscribe(
        resposta => {
          this.funcionarios = resposta as any;
          this.numeroColaboradores = this.funcionarios.length;
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      );
  }

  editar(funcionario: Funcionario) {
    this.funcionarioService.setFuncionario(funcionario);
    this.router.navigate([ '/cadfuncionario']);
  }

  pesquisar() {
    let nomePesquisa = this.formulario.get('nome').value;
    let sexo = this.formulario.get('sexo').value;
    console.log(sexo);
    if (sexo === 'F') {
      sexo = 'M' 
    } else if (sexo==='M') {
      sexo = 'F';
    }
    if (nomePesquisa == null) {
      nomePesquisa = '@';
    }
    if ((nomePesquisa.length > 0) && (this.funcaoSelecionada == null) && (this.lojaSelecionada == null)) {
      this.pesquisarNome(nomePesquisa);
    } else if ((this.lojaSelecionada != null) && (this.funcaoSelecionada != null)) {
      this.pesquisarFuncionarioFuncaoLoja(nomePesquisa, sexo);
    } else if (this.funcaoSelecionada != null) {
        this.pesquisarFuncao(nomePesquisa, sexo);
    } else if (this.lojaSelecionada != null) {
          this.pesquisarLoja(nomePesquisa, sexo);
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
        this.numeroColaboradores = this.funcionarios.length;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  pesquisarLoja(nomePesquisa: string, sexo: any) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.getFuncionarioLoja(this.lojaSelecionada.idloja, nomePesquisa, situacao, sexo).subscribe(
      resposta => {
        this.funcionarios = resposta as any;
        this.numeroColaboradores = this.funcionarios.length;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  pesquisarFuncao(nomePesquisa: string, sexo: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.getFuncionarioFuncao(this.funcaoSelecionada.idfuncao, nomePesquisa, situacao, sexo).subscribe(
      resposta => {
        this.funcionarios = resposta as any;
        this.numeroColaboradores = this.funcionarios.length;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  pesquisarFuncionarioFuncaoLoja(nomePesquisa: string, sexo: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.getFuncionarioFuncaoLoja(this.lojaSelecionada.idloja,
      this.funcaoSelecionada.idfuncao, nomePesquisa, situacao, sexo ).subscribe(
      resposta => {
        this.funcionarios = resposta as any;
        this.numeroColaboradores = this.funcionarios.length;
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

  compararSetor(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setSetor() {
    this.setorSelecionado = this.formulario.get('setor').value;
  }

  pesquisarLimpar() {
    this.formulario.reset();
    this.funcaoSelecionada = null;
    this.lojaSelecionada = null;
    this.consultar();
  }

  selecionarFuncionario(funcionarioConsulta: Funcionario) {
    this.funcionarioService.setFuncionario(funcionarioConsulta);
    if ( this.funcionarioService.getRota() === 'cadasoagenda') {
      this.funcionarioService.setRota('');
      this.router.navigate([ '/cadasoagenda' ]);
    } else if ( this.funcionarioService.getRota() === 'cadasocontrole') {
      this.funcionarioService.setRota('');
      this.asoControleService.setOp('n');
      this.router.navigate([ '/cadasocontrole']);
    } else if ( this.funcionarioService.getRota() === 'treinamento') {
      this.funcionarioService.setRota('');
      this.router.navigate([ '/constreinamento']);
    } else if ( this.funcionarioService.getRota() === 'listatreinamento') {
      this.funcionarioService.setRota('');
      this.router.navigate([ '/listatreinamento']);
    }else if ( this.funcionarioService.getRota() === 'cadafastamento') {
      this.funcionarioService.setRota('');
      this.router.navigate([ '/cadafastamento']);
    }
  }

  getSituacao(funcionario: Funcionario) {
    // tslint:disable-next-line:no-conditional-assignment
    if ( funcionario.situacao = 'Ativo' ) {
      return true;
    } else {
      return false;
    }
  }

  addTreinamentoFuncionario(funcionario: Funcionario) {
    const treinamento = this.treinamentoService.getTreinamento();
    if (treinamento != null) {
      let tf = new Treinamentoparticipante();
      tf.funcionario = funcionario;
      tf.compareceu = false;
      tf.loja = funcionario.loja;
      tf.nota = 0;
      tf.treinamento = treinamento;
      this.treinamentoService.salvarParticipante(tf).subscribe(
        reposta => {
          tf = reposta as any;
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      );
    }
  }

  removerTreinamentoFuncionario(funcionario: Funcionario) {
    const p = this.getParticipante(funcionario);
    if (p != null) {
    this.treinamentoService.deletarParticipante(p).subscribe(
        reposta => {
          const tf = reposta as any;
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      );
    }
  }

  getParticipante(funcionario: Funcionario) {
    for (const p of this.listaParticipante) {
      if (p.funcionario.idfuncionario === funcionario.idfuncionario) {
        return p;
      }
    }
    return null;
  }

  verificarNaoParticipante(funcinario: Funcionario) {
    if (this.listaParticipante === null) {
      this.listaParticipante = [];
    }
    if (this.habilitarTreinamento) {
    for (let i = 0; i < this.listaParticipante.length; i++) {
      if (this.listaParticipante[i].funcionario.idfuncionario === funcinario.idfuncionario) {
        i = 100000;
        this.TaParticipando = true;
        return false;
      }
    }
    this.TaParticipando = false;
    return true;
    } else {
      return false;
    }
  }

  verificarParticipante() {
    if (this.habilitarTreinamento) {
    if (this.TaParticipando) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

novoAso(funcionario: Funcionario) {
  this.funcionarioService.setFuncionario(funcionario);
  this.asoControleService.setOp('n');
  this.funcionarioService.setRota('');
  this.router.navigate([ '/cadasocontrole']);
}

imprimir() {
  if (this.lojaSelecionada!=null) {
    if (this.lojaSelecionada.idloja!=null){
      let cor = this.formulario.get('cor').value;
      let local = this.formulario.get('local').value;
      const uri =env.baseApiUrl + 'funcionarios/tro/' + this.lojaSelecionada.idloja + "/" + local + "/" + cor;
      return uri;
    }
  }
  
}

abrirModal() {
  this.showModalDataTermoMascaraOnClick.show();
}

fecharModal() {
  this.showModalDataTermoMascaraOnClick.hide();
}

pesquisarNovo() {
  let nome = this.formulario.get('nome').value;
  let situacao = this.formulario.get('situacao').value;
  let sexo = this.formulario.get('sexo').value;
  if (nome === null) {
    nome = '@';
  }
  if (situacao === null) {
    situacao = '@';
  }
  if (sexo === null) {
    sexo = '@';
  }
  let funcao;
  if (this.funcaoSelecionada != null) {
    funcao = this.funcaoSelecionada.nome;
  }else funcao = '@';
  let loja;
  if (this.lojaSelecionada != null) {
    loja = this.lojaSelecionada.nome;
  } else loja = '@';
  let setor;
  if (this.setorSelecionado != null){
    setor = this.setorSelecionado.nome;
  }else setor = '@';
  this.funcionarioService.findByOrderNome(nome, funcao, loja, situacao, sexo, setor).subscribe(
    resposta => {
      this.funcionarios = resposta as any;
      this.numeroColaboradores = this.funcionarios.length;
      this.funcionarios.sort((a,b) => a.nome.localeCompare(b.nome));  
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
  );
}

limparNovo() {
  this.formulario.reset;
  this.funcaoSelecionada = null;
  this.setorSelecionado = null;
  this.lojaSelecionada = null;
  this.pesquisarNovo();
}

orderByNome(){
  console.log('nome');
  this.funcionarios.sort((a,b) => a.nome.localeCompare(b.nome));   
}

orderBySetor(){
  console.log('setor');
  this.funcionarios.sort((a,b) => a.setor.nome.localeCompare(b.setor.nome));   
}

orderByLoja(){
  this.funcionarios.sort((a,b) => a.loja.nome.localeCompare(b.loja.nome));  
}

orderByFuncao(){
  this.funcionarios.sort((a,b) => a.funcao.nome.localeCompare(b.funcao.nome));  
}

orderByCBO(){
  this.funcionarios.sort((a,b) => a.funcao.cbo.localeCompare(b.funcao.cbo));  
}

orderBySituacao(){
  this.funcionarios.sort((a,b) => a.situacao.localeCompare(b.situacao));  
}

verFuncionario(f: Funcionario) {
  this.funcionarioService.setFuncionario(f);
  this.router.navigate(['/verfuncionario']);
}




}
