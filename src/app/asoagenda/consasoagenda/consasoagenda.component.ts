import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { Asoagenda } from '../model/asoagenda';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { Router } from '@angular/router';
import { AsotipoService } from 'src/app/asocontrole/asotipo.service';
import { LojaService } from 'src/app/loja/loja.service';
import { AsoagendaService } from '../asoagenda.service';

import { environment as env } from '../../../environments/environment.prod';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { Asocontrole } from 'src/app/asocontrole/model/asocontrole';
import { AsocontroleService } from 'src/app/asocontrole/asocontrole.service';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';

@Component({
  selector: 'app-consasoagenda',
  templateUrl: './consasoagenda.component.html',
  styleUrls: ['./consasoagenda.component.scss']
})
export class ConsasoagendaComponent implements OnInit {

  formulario: FormGroup;
  dataExame: Date;
  isFirstOpen = false;
  oneAtATime: true;
  lojas: Loja[];
  lojaSelecionada: Loja;
  asoAgendas: Asoagenda[];
  asoAgenda: Asoagenda;
  @ViewChild('dataexame', null) public showModalDataExameOnClick: ModalDirective;
  aso: Asocontrole;
  lastAsoControles: Asocontrole;


  constructor(
    private formBuilder: FormBuilder,
    private funcaoService: FuncaoService,
    private router: Router,
    private asotipoService: AsotipoService,
    private lojaService: LojaService,
    private asoagendaService: AsoagendaService,
    private authService: AuthService,
    private asocontroleService: AsocontroleService,
    private funcionarioService: FuncionarioService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      situacao: [null],
    });
    this.carregarComboBox();
    this.formulario.reset();
    this.consultar();
  }

  carregarComboBox() {
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get('loja').value;
  }

  consultar() {
    this.asoagendaService.listar().subscribe(
      resposta => {
        this.asoAgendas = resposta as any;
      }
    );
  }

  pesquisarLimpar() {
    this.formulario.reset();
    this.lojaSelecionada = null;
    this.consultar();
  }

  pesquisar() {
    let nomePesquisa = this.formulario.get('nome').value;
    const situacao = this.formulario.get('situacao').value;
    if (nomePesquisa == null) {
      nomePesquisa = '@';
    }
    if ((this.lojaSelecionada != null) && (situacao != null)) {
      this.pesquisarAll( this.lojaSelecionada.idloja, nomePesquisa, situacao);
    } else if (this.lojaSelecionada != null) {
      this.pesquisarLoja(this.lojaSelecionada.idloja, nomePesquisa);
    } else if (situacao != null) {
      this.pesquisarSituacao(situacao, nomePesquisa);
    } else {
      this.pesquisarNome(nomePesquisa);
    }
  }

pesquisarNome( nomePesquisa: string ) {
  this.asoagendaService.pesquisarNome( nomePesquisa ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
      console.log(this.asoAgendas);
    }
  );
}

pesquisarLoja( idLoja: number, nomePesquisa: string) {
  this.asoagendaService.pesquisarLoja( idLoja, nomePesquisa ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

pesquisarSituacao( situacao: string, nomePesquisa: string) {
  this.asoagendaService.pesquisarSituacao( situacao, nomePesquisa ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

pesquisarAll( idLoja: number, nomePesquisa: string, situacao: string) {
  this.asoagendaService.pesquisar( idLoja, nomePesquisa, situacao ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

novo() {
  this.asoagendaService.setAsoAgenda(null);
  this.router.navigate([ '/cadasoagenda']);
}

editar(asoAgenda: Asoagenda) {
  this.asoagendaService.setAsoAgenda(asoAgenda);
  this.router.navigate([ '/cadasoagenda']);
}

imprimir(asoAgenda: Asoagenda) {
  let uri =  env.baseApiUrl + 'asoagenda/autorizacao/' + asoAgenda.idasoagenda; 
  return uri;
}

cancelar(asoAgenda: Asoagenda) {
  asoAgenda.usuario = this.authService.getUsuario();
  asoAgenda.datacancelamento = new Date;
  asoAgenda.situacao= 'Cancelado';
  this.asoagendaService.salvar(asoAgenda).subscribe(resposta => {
    asoAgenda = resposta as Asoagenda;
  });
}

finalizar(asoAgenda: Asoagenda) {
  this.asoAgenda = asoAgenda;
  this.openModalFluxoCaixa();
}

salvar() {
  this.asoAgenda.usuario = this.authService.getUsuario();
  this.asoAgenda.situacao= 'Finalizado';
  this.asoAgenda.dataexame = this.dataExame;
  this.asoagendaService.salvar(this.asoAgenda).subscribe(resposta => {
    this.asoAgenda = resposta as Asoagenda;
    this.consultar();
    this.showModalDataExameOnClick.hide();
  });
}

openModalFluxoCaixa() {
  this.showModalDataExameOnClick.show();
}

salvarAso() {
  this.aso.agendado = false;
  this.aso.asotipo = this.asoAgenda.asotipo;
  this.aso.dataexame = this.asoAgenda.dataexame;
  this.dataExame.setDate(this.dataExame.getDate() + this.asoAgenda.asotipo.periodicidade);
  this.aso.datavencimento = this.dataExame;
  this.aso.funcionario = this.asoAgenda.funcionario;
  this.aso.finalizado = false;
  this.aso.situacao = 'https://tecseg-img.s3.us-east-2.amazonaws.com/atestadodia.png';
  let salvarFunc : boolean = false
  if (this.aso.asotipo.idasotipo === 5) {
    this.aso.funcionario.situacao = 'Inativo';
    this.aso.funcionario.datasituacao = this.aso.dataexame;
    salvarFunc = true;
  } else if ( this.aso.asotipo.idasotipo === 4) {
    this.aso.funcionario.situacao = 'Ativo';
    this.aso.funcionario.datasituacao = this.aso.dataexame;
    salvarFunc = true;
  } else if ( this.aso.asotipo.idasotipo === 1) {
    this.aso.funcionario.situacao = 'Ativo';
    this.aso.funcionario.datasituacao = this.aso.dataexame;
    salvarFunc = true;
  }
  const idfuncao = this.asoAgenda.funcao.idfuncao;
  this.asocontroleService.getLast(this.aso.funcionario.idfuncionario).subscribe(resposta => {
    this.lastAsoControles = resposta as any;
    if (this.aso.funcionario.funcao.idfuncao !== idfuncao) {
      this.aso.funcionario.funcao = this.asoAgenda.funcao;
      this.funcionarioService.atualizar(this.aso.funcionario).subscribe(resposta1 => {
        this.aso.funcionario = resposta1 as any;
      });
    }
    this.asocontroleService.salvar(this.aso).subscribe(resposta2 => {
      this.aso = resposta2 as any;
      if ( salvarFunc ) {
        this.funcionarioService.salvar(this.aso.funcionario).subscribe (
          resposta4 => {
            this.aso.funcionario = resposta4 as any;
          }
        )
      }
      if ( this.lastAsoControles != null ) {
        this.lastAsoControles.funcionario = this.aso.funcionario;
        this.lastAsoControles.finalizado = true;
        this.asocontroleService.atualizar(this.lastAsoControles).subscribe( resposta3 => {
          this.aso = resposta3 as any;
        });
      }
    });
  },
  err => {
    console.log(err.error.erros.join(' '));
  }
  );

}

}