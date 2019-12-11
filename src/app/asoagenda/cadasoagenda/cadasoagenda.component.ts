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

@Component({
  selector: 'app-cadasoagenda',
  templateUrl: './cadasoagenda.component.html',
  styleUrls: ['./cadasoagenda.component.scss']
})
export class CadasoagendaComponent implements OnInit {
  formulario: FormGroup;
  tipos: Asotipo[];
  tipoSelecionado: Asotipo;
  funcoes: Funcao[];
  asoControle: Asocontrole;
  funcaoSelecionada: Funcao;
  funcionarioSelecionado: Funcionario;
  asoAgenda: Asoagenda;
  clinicaSelecionada: Clinica;
  clinicas: Clinica[];
  enabledFuncao = false;
  public maskHora = [/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/,  ':', /[0-9]/, /[0-9]/];
  rotaConsulta: string;
  inscricao: Subscription;
  habilitarConsultaFuncionario = true;
  rota: string;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private asotipoService: AsotipoService,
    private funcaoService: FuncaoService,
    private router: Router,
    private activeRrouter: ActivatedRoute,
    private asocontroleService: AsocontroleService,
    private asoagendaService: AsoagendaService,
    private clinicaService: ClinicaService,
  ) { }

  ngOnInit() {
    this.funcionarioSelecionado = new Funcionario();
    this.funcionarioSelecionado.funcao = new Funcao();
    this.funcionarioSelecionado.funcao.nome = 'Função';
    this.funcionarioSelecionado.nome = 'Nome do funcioário';
    this.funcaoSelecionada = new Funcao();
    this.funcaoSelecionada.nome = 'Função';
    this.funcionarioSelecionado.loja = new Loja();
    this.funcionarioSelecionado.loja.nome = 'Loja';
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      idasoagenda: [null],
      dataexame: [null],
      hora: [null],
      situacao: [null],
      funcionario: [null],
      asotipo: [null],
      funcao: [null],
      clinica: [null],
    });

    let id;
    this.inscricao = this.activeRrouter.params.subscribe(params => {
      id = params.id;
      this.rota = params.rota;
      if (this.rota === 'consfuncionario') {
      if (id != null) {
        this.funcionarioService.getFuncionarioId(id).subscribe(
          resposta => {
            this.funcionarioSelecionado = resposta as Funcionario;
            this.formulario = this.formBuilder.group({
              idasoagenda: [null],
              dataexame: [null],
              hora: [null],
              situacao: [null],
              funcionario: this.funcionarioSelecionado,
              asotipo: [null],
              funcao: this.funcionarioSelecionado.funcao,
              clinica: this.clinicaSelecionada,
            });
          },
          err => {
            console.log(err.error.erros.join(' '));
          }
        );
      }
    } else if ( this.rota === 'asoagenda' ) {
      if (id != null) {
        this.habilitarConsultaFuncionario = false;
        this.asoagendaService.getId(id).subscribe(
          resposta => {
            this.asoAgenda = resposta as Asoagenda;
            this.funcionarioSelecionado = this.asoAgenda.funcionario;
            this.funcaoSelecionada = this.asoAgenda.funcao;
            this.clinicaSelecionada = this.asoAgenda.clinica;
            this.tipoSelecionado = this.asoAgenda.asotipo;
            console.log(this.asoAgenda);
            this.formulario = this.formBuilder.group({
              idasoagenda: [this.asoAgenda.idasoagenda],
              dataexame: [this.asoAgenda.dataexame],
              hora: [this.asoAgenda.horaexame],
              situacao: [this.asoAgenda.situacao],
              funcionario: [this.funcionarioSelecionado],
              asotipo: [this.tipoSelecionado],
              funcao: [this.funcaoSelecionada],
              clinica: [this.clinicaSelecionada],
            });
          },
          err => {
            console.log(err.error.erros.join(' '));
          }
        );
      }
    } else if (this.rota === 'asocontrole') {
      if (id != null) {
        this.habilitarConsultaFuncionario = false;
        this.asocontroleService.getId(id).subscribe(
          resposta => {
            this.asoControle = resposta as Asocontrole;
            this.funcionarioSelecionado = this.asoControle.funcionario;
            this.funcaoSelecionada = this.asoControle.funcionario.funcao;
            this.formulario = this.formBuilder.group({
              idasoagenda: [null],
              dataexame: [null],
              hora: [null],
              situacao: [null],
              funcionario: [this.funcionarioSelecionado],
              asotipo: [null],
              funcao: [this.funcaoSelecionada],
              clinica: [null],
            });
          },
          err => {
            console.log(err.error.erros.join(' '));
          }
        );
      }
    }
    });
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
      if ( this.clinicas.length === 1) {
        this.clinicaSelecionada = this.clinicas[0];
      }
    });
  }

  compararTipo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setTipo() {
    this.tipoSelecionado = this.formulario.get('asotipo').value;
    if ( this.tipoSelecionado.idasotipo === 3 ) {
      this.enabledFuncao = true;
    } else {
      this.enabledFuncao = false;
    }
  }

  setFuncao() {
    this.funcaoSelecionada = this.formulario.get('funcao').value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idfuncao === obj2.idfuncao : obj1 === obj2;
  }

  setClinica() {
    this.clinicaSelecionada = this.formulario.get('clinica').value;
  }

  compararClinica(obj1, obj2) {
    return obj1 && obj2 ? obj1.idclinica === obj2.idclinica : obj1 === obj2;
  }

  consultaFuncionario() {
    this.router.navigate([ '/consfuncionario' ,   'true', 'asoagenda' ]);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  salvar() {
    this.asoAgenda = this.formulario.value;
    this.asoagendaService.salvar(this.asoAgenda).subscribe(resposta => {
      this.asoAgenda = resposta as Asoagenda;
      if (this.asoAgenda.situacao === 'agendado') {
          if (this.asoControle !== null) {
            this.asoControle.agendado = true;
            this.asocontroleService.atualizar(this.asoControle).subscribe(resposta2 => {
              this.asoControle = resposta2 as any;
            });
          }
      }
    });
    this.cancelar();
  }

  cancelar() {
    this.formulario.reset();
    if (this.rota === 'asoagenda') {
      this.router.navigate([ '/consasoagenda']);
    } else if ( this.rota === 'asocontrole') {
      this.router.navigate([ '/consasocontrole']);
    }
  }


}
