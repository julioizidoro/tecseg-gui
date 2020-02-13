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
import { Asocontrole } from 'src/app/asocontrole/model/asocontrole';
import { AsocontroleService } from 'src/app/asocontrole/asocontrole.service';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Agendaexame } from '../model/agendaexame';
import { Exame } from 'src/app/asocontrole/model/exame';
import { AlertModelService } from 'src/app/share/alert-model.service';
import { Autlaboratorio } from '../model/autlaboratorio';

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
  agendaExames: Agendaexame[];
  @ViewChild('Exames') public showModalDataExameOnClick: ModalDirective;
  @ViewChild('autExames') public showModalAutExameOnClick: ModalDirective;
  aso: Asocontrole;
  lastAsoControles: Asocontrole;
  listaAutLaboratorio: Autlaboratorio[];


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
    private alertService: AlertModelService,
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
      this.pesquisarAll(this.lojaSelecionada.idloja, nomePesquisa, situacao);
    } else if (this.lojaSelecionada != null) {
      this.pesquisarLoja(this.lojaSelecionada.idloja, nomePesquisa);
    } else if (situacao != null) {
      this.pesquisarSituacao(situacao, nomePesquisa);
    } else {
      this.pesquisarNome(nomePesquisa);
    }
  }

  pesquisarNome(nomePesquisa: string) {
    this.asoagendaService.pesquisarNome(nomePesquisa).subscribe(
      resposta => {
        this.asoAgendas = resposta as any;
      }
    );
  }

  pesquisarLoja(idLoja: number, nomePesquisa: string) {
    this.asoagendaService.pesquisarLoja(idLoja, nomePesquisa).subscribe(
      resposta => {
        this.asoAgendas = resposta as any;
      }
    );
  }

  pesquisarSituacao(situacao: string, nomePesquisa: string) {
    this.asoagendaService.pesquisarSituacao(situacao, nomePesquisa).subscribe(
      resposta => {
        this.asoAgendas = resposta as any;
      }
    );
  }

  pesquisarAll(idLoja: number, nomePesquisa: string, situacao: string) {
    this.asoagendaService.pesquisar(idLoja, nomePesquisa, situacao).subscribe(
      resposta => {
        this.asoAgendas = resposta as any;
      }
    );
  }

  novo() {
    this.asoagendaService.setAsoAgenda(null);
    this.router.navigate(['/cadasoagenda']);
  }

  editar(asoAgenda: Asoagenda) {
    this.asoagendaService.setAsoAgenda(asoAgenda);
    this.router.navigate(['/cadasoagenda']);
  }

  imprimir(asoAgenda: Asoagenda) {
    const uri = env.baseApiUrl + 'asoagenda/autorizacao/' + asoAgenda.idasoagenda;
    return uri;
  }

  cancelar(asoAgenda: Asoagenda) {
    asoAgenda.usuario = this.authService.getUsuario();
    asoAgenda.datacancelamento = new Date();
    asoAgenda.situacao = 'Cancelado';
    this.asoagendaService.salvar(asoAgenda).subscribe(resposta => {
      asoAgenda = resposta as Asoagenda;
    });
  }

  finalizar(asoAgenda: Asoagenda) {
    this.asoAgenda = asoAgenda;
    this.asoagendaService.listarAgendaExame(this.asoAgenda).subscribe(
      resposta => {
        this.agendaExames = resposta as any;
        this.showModalDataExameOnClick.show();
      }
    );
  }

  salvar() {
    this.asoAgenda.usuario = this.authService.getUsuario();
    this.asoAgenda.situacao = 'Finalizado';
    this.asoAgenda.dataexame = this.dataExame;
    this.asoagendaService.salvar(this.asoAgenda).subscribe(resposta => {
      this.asoAgenda = resposta as Asoagenda;
      this.consultar();
      this.showModalDataExameOnClick.hide();
    });
  }


  salvarAso(exame: Agendaexame) {
    console.log("salvar Aso")
    this.aso = new Asocontrole();
    this.aso.agendado = false;
    this.aso.asotipo = exame.asotipo;
    this.aso.dataexame = exame.datalancamento;
    this.aso.funcionario = this.asoAgenda.funcionario;
    this.aso.finalizado = false;
    this.aso.situacao = 'https://tecseg-img.s3.us-east-2.amazonaws.com/atestadodia.png';
    let salvarFunc = false;
    if (this.aso.asotipo.idasotipo === 5) {
      this.aso.funcionario.situacao = 'Inativo';
      this.aso.funcionario.datasituacao = this.aso.dataexame;
      this.aso.finalizado = true;
      salvarFunc = true;
    } else if (this.aso.asotipo.idasotipo === 4) {
      this.aso.funcionario.situacao = 'Ativo';
      this.aso.funcionario.datasituacao = this.aso.dataexame;
      salvarFunc = true;
    } else if (this.aso.asotipo.idasotipo === 1) {
      this.aso.funcionario.situacao = 'Ativo';
      this.aso.funcionario.datasituacao = this.aso.dataexame;
      salvarFunc = true;
    } else if (this.aso.asotipo.idasotipo === 3) {
      this.aso.funcionario.funcao = this.asoAgenda.funcao;
      this.aso.funcionario.datasituacao = this.aso.dataexame;
      salvarFunc = true;
    }
   
    this.asocontroleService.getLast(this.aso.funcionario.idfuncionario, this.aso.asotipo.tipo).subscribe(resposta => {
      this.lastAsoControles = resposta as any;
      this.asocontroleService.salvar(this.aso).subscribe(resposta2 => {
        this.aso = resposta2 as any;
        if (salvarFunc) {
          this.funcionarioService.salvar(this.aso.funcionario).subscribe(
            resposta4 => {
              this.aso.funcionario = resposta4 as any;
            }
          );
        }
        if (this.lastAsoControles != null) {
          this.lastAsoControles.funcionario = this.aso.funcionario;
          this.lastAsoControles.finalizado = true;
          this.asocontroleService.atualizar(this.lastAsoControles).subscribe(resposta3 => {
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

  salvarFinalizar() {
    this.showModalDataExameOnClick.hide();
    this.asoagendaService.salvarListaAgendaExame(this.agendaExames).subscribe(
      resposta => {
        this.agendaExames = resposta as any;
        let agendado = false;
        for (let exame of this.agendaExames) {
          if (exame.situacao === 'Agendado') {
            agendado = true;
          }
        }
        if (!agendado) {
          this.asoAgenda.datacancelamento = new Date();
          this.asoAgenda.situacao = 'Finalizado';
          this.asoAgenda.usuario = this.authService.getUsuario();
          this.asoagendaService.salvar(this.asoAgenda).subscribe(
            resposta2 => {
              this.asoAgenda = resposta2 as any;
            },
            err => {
              console.log(err.error.erros.join(' '));
            }
          );
        }
      }
    );
  }

  

  fecharModal() {
    this.showModalDataExameOnClick.hide();
  }

  imprimirAutoLaboratorio(asoAgenda: Asoagenda) {
    this.asoAgenda = asoAgenda;
    this.listaAutLaboratorio = [];
    this.asoagendaService.listarAgendaExame(this.asoAgenda).subscribe(
      resposta => {
        this.agendaExames = resposta as any;
        for (let exame of this.agendaExames) {
          if (exame.situacao === 'Agendado') {
            let aut = new Autlaboratorio();
            aut.agendaexame = exame;
            aut.selecionado = false;
            this.listaAutLaboratorio.push(aut)
          }
        }
        this.showModalAutExameOnClick.show();
      }
    );  
  }

  GerarAsoControle(exame: Agendaexame) {
    if (exame.datalancamento === null) {
      if (exame.situacao != 'Agendado') {
        this.alertService.showAlertDanger("Preenchar data do Exame");
      }
    } else {
      if (exame.situacao==='Finalizado'){
        this.salvarAso(exame);
      }
    }
    
  }

  
}
