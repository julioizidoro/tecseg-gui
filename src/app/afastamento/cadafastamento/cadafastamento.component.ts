import { Component, OnInit } from '@angular/core';
import { Historicosituacao } from '../model/historicosituacao';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Codigoafastamento } from '../model/codigoafastamento';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { AfastamentoService } from '../afastamento.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Loja } from 'src/app/loja/model/loja';

@Component({
  selector: 'app-cadafastamento',
  templateUrl: './cadafastamento.component.html',
  styleUrls: ['./cadafastamento.component.scss']
})
export class CadafastamentoComponent implements OnInit {

  formulario: FormGroup;
  listaCodigo: Codigoafastamento[];
  codigoAfastamento: Codigoafastamento;
  historico: Historicosituacao;
  funcionarioSelecionado: Funcionario;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private afastamentoService: AfastamentoService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.funcionarioSelecionado = this.funcionarioService.getFuncionario();
    if (this.funcionarioSelecionado == null) {
      this.funcionarioSelecionado = new Funcionario();
      this.funcionarioSelecionado.nome = 'Nome do funcioário';
      this.funcionarioSelecionado.funcao = new Funcao();
      this.funcionarioSelecionado.funcao.nome = "Função";
      this.funcionarioSelecionado.loja = new Loja();
      this.funcionarioSelecionado.loja.nome = 'Loja';
    }
    this.carregarComboBox();
    this.historico = this.afastamentoService.getHistorico();
    if (this.historico != null) {
      this.formulario = this.formBuilder.group({
        idhistoricosituacao: this.historico.idhistoricosituacao,
        data: this.historico.data,
        observacao: this.historico.observacao,
        funcionario: this.historico.funcionario,
        codigoafastamento: this.historico.codigoafastamento,
        usuario: this.historico.usuario,
      });
      this.funcionarioSelecionado = this.historico.funcionario;
      this.codigoAfastamento = this.historico.codigoafastamento;
    } else {
      this.formulario = this.formBuilder.group({
        idhistoricosituacao: [null],
        data: [null],
        observacao: [null],
        funcionario: [null],
        codigoafastamento: [null],
      });

    }

  }


  carregarComboBox() {
    this.afastamentoService.listar('@').subscribe(resposta => {
      this.listaCodigo = resposta as any;
    },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  compararCodigo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setCodigo() {
    this.codigoAfastamento = this.formulario.get('codigoafastamento').value;
  }

  consultaFuncionario() {
    this.funcionarioService.setFuncionario(null);
    this.funcionarioService.setRota('cadafastamento');
    this.router.navigate(['/consfuncionario']);
  }

  salvar() {
    this.historico = this.formulario.value;
    this.historico.funcionario = this.funcionarioSelecionado;
    this.historico.codigoafastamento = this.codigoAfastamento;
    this.historico.usuario = this.authService.getUsuario();
    this.afastamentoService.salvar(this.historico).subscribe(
      resposta => {
        this.historico = resposta as any;
        this.afastamentoService.setHistorico(null);
        this.router.navigate(['/consafastamento']);
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }
  
  cancelar() {
    this.formulario.reset();
    this.afastamentoService.setHistorico(null);
    this.router.navigate(['/consafastamento']);
  }
  


}
