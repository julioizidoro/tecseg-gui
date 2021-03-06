import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Asotipo } from 'src/app/asocontrole/model/asotipo';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Asocontrole } from 'src/app/asocontrole/model/asocontrole';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Asoagenda } from '../model/asoagenda';
import { Clinica } from 'src/app/clinica/model/clinica';
import { Subscription } from 'rxjs';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AsocontroleService } from 'src/app/asocontrole/asocontrole.service';
import { AsoagendaService } from '../asoagenda.service';
import { ClinicaService } from 'src/app/clinica/clinica.service';
import { Loja } from 'src/app/loja/model/loja';
import { AsotipoService } from 'src/app/asocontrole/asotipo.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Agendaexame } from '../model/agendaexame';


@Component({
  selector: 'app-cadasoagenda',
  templateUrl: './cadasoagenda.component.html',
  styleUrls: ['./cadasoagenda.component.scss']
})
export class CadasoagendaComponent implements OnInit {
  formulario: FormGroup;
  tipos: Asotipo[];
  funcoes: Funcao[];
  asoControle: Asocontrole;
  funcaoSelecionada: Funcao;
  funcionarioSelecionado: Funcionario;
  asoAgenda: Asoagenda;
  clinicaSelecionada: Clinica;
  clinicas: Clinica[];
  agendaExames: Agendaexame[];
  enabledFuncao = false;
  public maskHora = [/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/];
  rotaConsulta: string;
  inscricao: Subscription;
  habilitarConsultaFuncionario = false;
  rota: string;
  agenciaExame: Agendaexame;


  selected = [];

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private asotipoService: AsotipoService,
    private funcaoService: FuncaoService,
    private router: Router,
    private asocontroleService: AsocontroleService,
    private asoagendaService: AsoagendaService,
    private clinicaService: ClinicaService,
    private authService: AuthService,
  ) {
    this.carregarComboBox();
  }

  ngOnInit() {
    this.asoAgenda = this.asoagendaService.getAsoAgenda();
    this.agendaExames = [];
    if (this.asoAgenda != null) {
      this.funcionarioSelecionado = this.asoAgenda.funcionario;
      this.funcaoSelecionada = this.asoAgenda.funcao;
      this.clinicaSelecionada = new Clinica();
      this.formulario = this.formBuilder.group({
        idasoagenda: this.asoAgenda.idasoagenda,
        dataexame: this.asoAgenda.dataexame,
        hora: this.asoAgenda.hora,
        situacao: this.asoAgenda.situacao,
        datacancelamento: this.asoAgenda.datacancelamento,
        funcionario: this.asoAgenda.funcionario,
        asotipo: new Asotipo(),
        funcao: this.asoAgenda.funcao,
        clinica: new Clinica(),
        usuario: this.asoAgenda.usuario,
      });
      this.asoagendaService.listarAgendaExame(this.asoAgenda).subscribe(
        resposta => {
          this.agendaExames = resposta as any;
        }
      );
    } else {
      this.asoControle = this.asocontroleService.getAso();
      if (this.asoControle != null) {
        this.habilitarConsultaFuncionario = true;
        this.asoAgenda = new Asoagenda();
        this.agendaExames = [];
        this.funcionarioSelecionado = this.asoControle.funcionario;
        this.funcaoSelecionada = this.asoControle.funcionario.funcao;
        this.asoAgenda.funcionario = this.asoControle.funcionario;
        this.asoAgenda.usuario = this.authService.getUsuario();
        this.asocontroleService.setAso(null);
        this.formulario = this.formBuilder.group({
          idasoagenda: [null],
          dataexame: [null],
          hora: [null],
          situacao: [null],
          datacancelamento: [],
          funcionario: [this.funcionarioSelecionado],
          asotipo: [null],
          funcao: [this.funcaoSelecionada],
          clinica: [null],
          usuario: this.authService.getUsuario(),
        });
      } else {
        this.funcionarioSelecionado = this.funcionarioService.getFuncionario();
        this.funcionarioService.setFuncionario(null);
        if (this.funcionarioSelecionado != null) {
          this.asoAgenda = new Asoagenda();
          this.agendaExames = [];
          this.asoAgenda.funcionario = this.funcionarioSelecionado;
          this.funcaoSelecionada = this.funcionarioSelecionado.funcao;
          this.formulario = this.formBuilder.group({
            idasoagenda: [null],
            dataexame: [null],
            hora: [null],
            situacao: [null],
            datacancelamento: [],
            funcionario: [this.funcionarioSelecionado],
            asotipo: [null],
            funcao: [this.funcaoSelecionada],
            clinica: [null],
          });
        }
      }
    }
    if (this.asoAgenda == null) {
      this.habilitarConsultaFuncionario = false;
      this.funcionarioSelecionado = new Funcionario();
      this.funcionarioSelecionado.funcao = new Funcao();
      this.funcionarioSelecionado.funcao.nome = 'Função';
      this.funcionarioSelecionado.nome = 'Nome do funcioário';
      this.funcaoSelecionada = new Funcao();
      this.funcaoSelecionada.nome = 'Função';
      this.funcionarioSelecionado.loja = new Loja();
      this.funcionarioSelecionado.loja.nome = 'Loja';
      this.formulario = this.formBuilder.group({
        idasoagenda: [null],
        dataexame: [null],
        hora: [null],
        situacao: [null],
        datacancelamento: [],
        funcionario: [null],
        asotipo: [null],
        funcao: [null],
        clinica: [null],
        usuario: [null],
      });
    }


  }

  carregarComboBox() {
    this.asotipoService.listar().subscribe(resposta => {
      this.tipos = resposta as any;
    });
    this.funcaoService.listar().subscribe(resposta => {
      this.funcoes = resposta as any;
    });
    this.clinicaService.listar().subscribe(resposta => {
      this.clinicas = resposta as any;
      if (this.clinicas.length === 1) {
        this.clinicaSelecionada = this.clinicas[0];
      }
    });
  }



  setFuncao() {
    this.funcaoSelecionada = this.formulario.get('funcao').value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idfuncao === obj2.idfuncao : obj1 === obj2;
  }

  compararClinica(obj1, obj2) {
    return obj1 && obj2 ? obj1.idclinica === obj2.idclinica : obj1 === obj2;
  }

  consultaFuncionario() {
    this.funcionarioService.setFuncionario(null);
    this.funcionarioService.setRota('cadasoagenda');
    this.router.navigate(['/consfuncionario']);
  }

  salvar() {
    console.log('salvar');
    if (this.agendaExames.length > 0) {
      this.asoAgenda = this.formulario.value;
      this.asoAgenda.funcionario = this.funcionarioSelecionado;
      this.asoAgenda.usuario = this.authService.getUsuario();
      if (this.asoAgenda.funcao === null) {
        this.asoAgenda.funcao = this.asoAgenda.funcionario.funcao;
      }
      if (this.asoAgenda.situacao === null) {
        this.asoAgenda.situacao = 'Agendado';
      }
      this.asoagendaService.salvar(this.asoAgenda).subscribe(resposta => {
        this.asoAgenda = resposta as Asoagenda;
        for (let i = 0; i < this.agendaExames.length; i++) {
          if (this.agendaExames[i].situacao === 'novo') {
            this.agendaExames[i].situacao = 'Agendado';
            this.agendaExames[i].asoagenda = this.asoAgenda;
          }
        }
        this.asoagendaService.salvarListaAgendaExame(this.agendaExames).subscribe(
          resposta3 => {
            this.agendaExames = resposta3 as any;
          },
          err => {
            console.log(err.error.erros.join(' '));
          }
        );
        if (this.asoAgenda.situacao === 'Agendado') {
          if (this.asoControle == null) {

          } else {
            this.asoControle.agendado = true;
            this.asocontroleService.atualizar(this.asoControle).subscribe(resposta2 => {
              this.asoControle = resposta2 as any;
            },
            err => {
              console.log(err.error.erros.join(' '));
            }
            );
          }
        }
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
      );
      this.cancelar();
    }
  }

  cancelar() {
    this.formulario.reset();
    if (this.asoControle != null) {
      this.router.navigate(['/consasocontrole']);
    } else {
      this.router.navigate(['/consasoagenda']);
    }
  }

  adicionarExame() {
    if (this.agendaExames === null) {
      this.agendaExames = [];
    }
    let clinica = this.formulario.get('clinica').value;
    let asoTipo = this.formulario.get('asotipo').value;
    if ((clinica != null) && (asoTipo != null)) {
      this.agenciaExame = new Agendaexame();
      this.agenciaExame.asotipo = asoTipo;
      this.agenciaExame.clinica = clinica;
      this.agenciaExame.situacao = 'novo';
      this.agenciaExame.usuario = this.authService.getUsuario();
      this.agendaExames.push(this.agenciaExame);
      if (this.agenciaExame.asotipo.idasotipo === 3) {
        this.enabledFuncao = true;
      }
      if (!this.verficarAsoTipoAdicionado(20)) {
        if ((this.agenciaExame.asotipo.idasotipo === 1) || (this.agenciaExame.asotipo.idasotipo === 2) || (this.agenciaExame.asotipo.idasotipo === 4)) {
          let agenciaExame = new Agendaexame();
          agenciaExame.asotipo = this.getAsoTipo(20);
          agenciaExame.clinica = clinica;
          agenciaExame.situacao = 'novo';
          agenciaExame.usuario = this.authService.getUsuario();
          this.agendaExames.push(agenciaExame);
        }
      }
    }
  }

  verficarAsoTipoAdicionado(id: number) {
    for (let i = 0; i < this.agendaExames.length; i++) {
      if (this.agendaExames[i].asotipo.idasotipo === id) {
        return true;
        i = 10000;
      }
    }
    return false;
  }

  getAsoTipo(id: number) {
    for (let i = 0; i < this.tipos.length; i++) {
      if (this.tipos[i].idasotipo === id) {
        return this.tipos[i];
        i = 10000;
      }
    }
  }

  cancelarAgendaExame(agendaExame: Agendaexame) {
    let index = this.agendaExames.indexOf(agendaExame);
    agendaExame.situacao = 'Cancelado';
    agendaExame.datalancamento = new Date();
    agendaExame.usuario = this.authService.getUsuario();
    this.asoagendaService.salvarAgendaExame(agendaExame).subscribe(
      resposta => {
        agendaExame = resposta as any;
        this.agendaExames[index] = agendaExame;
        if (agendaExame.asotipo.idasotipo === 3) {
          this.enabledFuncao = false;
        }
      }
    );
  }

  excluir(agendaExmae: Agendaexame) {
    const index = this.agendaExames.indexOf(agendaExmae);
    this.agendaExames.splice(index, 1);
  }



}
