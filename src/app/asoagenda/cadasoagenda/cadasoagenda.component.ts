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
  public maskHora = [/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/];
  rotaConsulta: string;
  inscricao: Subscription;
  habilitarConsultaFuncionario = false;
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
    private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log('parou');
    this.asoAgenda = this.asoagendaService.getAsoAgenda();
    if (this.asoAgenda !=null) {
      this.funcionarioSelecionado = this.asoAgenda.funcionario;
      this.funcaoSelecionada = this.asoAgenda.funcao;
      this.tipoSelecionado = this.asoAgenda.asotipo;
      this.clinicaSelecionada = this.asoAgenda.clinica;
      this.formulario = this.formBuilder.group({
        idasoagenda: this.asoAgenda.idasoagenda,
        dataexame: this.asoAgenda.dataexame,
        hora: this.asoAgenda.horaexame,
        situacao: this.asoAgenda.situacao,
        datacancelamento: this.asoAgenda.datacancelamento,
        funcionario: this.asoAgenda.funcionario,
        asotipo: this.asoAgenda.asotipo,
        funcao: this.asoAgenda.funcao,
        clinica: this.asoAgenda.clinica,
        usuario: this.asoAgenda.usuario,
      });  
    } else {
      this.asoControle = this.asocontroleService.getAso();
      if (this.asoControle !=null) {
        this.habilitarConsultaFuncionario = true;
        this.asoAgenda = new Asoagenda();
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
        if (this.funcionarioSelecionado !=null) {
          this.asoAgenda = new Asoagenda();
          this.asoAgenda.funcionario = this.funcionarioSelecionado;
            this.funcaoSelecionada = this.funcionarioSelecionado.funcao;
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
        }
      }
    }
    if ( this.asoAgenda == null) {
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
    console.log(this.funcionarioSelecionado);
    this.carregarComboBox();    
  
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
    this.funcionarioService.setFuncionario(null);
    this.funcionarioService.setRota('cadasoagenda');
    this.router.navigate([ '/consfuncionario' ]);
  }

  salvar() {
    this.asoAgenda = this.formulario.value;
    this.asoAgenda.funcionario = this.funcionarioSelecionado;
    this.asoAgenda.usuario = this.authService.getUsuario();
    if (this.asoAgenda.funcao === null) {
      this.asoAgenda.funcao = this.asoAgenda.funcionario.funcao;
    }
    if (this.asoAgenda.situacao === null){
      this.asoAgenda.situacao = 'Agendado';
    }
    this.asoagendaService.salvar(this.asoAgenda).subscribe(resposta => {
      this.asoAgenda = resposta as Asoagenda;
      if (this.asoAgenda.situacao === 'Agendado') {
          if (this.asoControle == null) {
            
          }else {
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
    if (this.asoControle !=null) {
      this.router.navigate([ '/consasocontrole']);
    } else  {
      this.router.navigate([ '/consasoagenda']);
    }
  }


}
