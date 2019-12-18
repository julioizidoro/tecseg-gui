import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Asotipo } from '../model/asotipo';
import { Asocontrole } from '../model/asocontrole';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { AsotipoService } from '../asotipo.service';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AsocontroleService } from '../asocontrole.service';
import { Loja } from 'src/app/loja/model/loja';
import * as moment from 'moment';


@Component({
  selector: 'app-cadasocontrole',
  templateUrl: './cadasocontrole.component.html',
  styleUrls: ['./cadasocontrole.component.scss']
})
export class CadasocontroleComponent implements OnInit {

  formularioAsoControle: FormGroup;
  tipos: Asotipo[];
  tipoSelecionado: Asotipo;
  aso: Asocontrole;
  lastAsoControles: Asocontrole;
  funcoes: Funcao[];
  funcaoSelecionada: Funcao;
  funcionarioSelecionado: Funcionario;
  idfuncao: number;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private asotipoService: AsotipoService,
    private funcaoService: FuncaoService,
    private router: Router,
    private activeRrouter: ActivatedRoute,
    private asocontroleService: AsocontroleService
  ) { }


  ngOnInit() {
    this.carregarComboBox();
    const op = this.asocontroleService.getOp();
    if ( op === 'n') {
      this.novoAso();
    } else if ( op === 'e') {
      this.editarAaso();
    }
  }


  editarAaso() {
    this.aso = this.asocontroleService.getAso();
    this.funcionarioSelecionado = this.asocontroleService.getAso().funcionario;
    this.funcaoSelecionada = this.funcionarioSelecionado.funcao;
    this.formularioAsoControle = this.formBuilder.group({
      idasocontrole: this.aso.idasocontrole,
      dataexame: this.aso.dataexame,
      datavencimento: this.aso.datavencimento,
      finalizado: this.aso.funcionario,
      observacao: this.aso.observacao,
      exame: this.aso.exame,
      asotipo: this.aso.asotipo,
      funcionario: this.funcionarioSelecionado,
      funcao: this.funcaoSelecionada,
    });
  }

  novoAso() {
    const aso = this.asocontroleService.getAso();
    if (aso != null) {
      this.funcionarioSelecionado = this.asocontroleService.getAso().funcionario;
    } else {
      this.funcionarioSelecionado = this.funcionarioService.getFuncionario();
    }
    if ( this.funcionarioSelecionado == null ) {
      this.funcionarioSelecionado = new Funcionario();
      this.funcionarioSelecionado.nome = 'Nome do funcioário';
      this.funcaoSelecionada = new Funcao();
      this.funcaoSelecionada.nome = 'Função';
      this.funcionarioSelecionado.loja = new Loja();
      this.funcionarioSelecionado.loja.nome = 'Loja';
    } else {
      this.funcaoSelecionada = this.funcionarioSelecionado.funcao;
      this.formularioAsoControle = this.formBuilder.group({
        idasocontrole: [null],
        dataexame: [null],
        datavencimento: [null],
        finalizado: [null],
        observacao: [null],
        exame: [null],
        asotipo: [null],
        funcionario: this.funcionarioSelecionado,
        funcao: this.funcaoSelecionada,
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
  }

  compararTipo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setTipo() {
    this.calcularDataVencimento();
  }

  salvar() {
    this.asocontroleService.setAso(null);
    this.asocontroleService.setOp('');
    this.funcionarioService.setFuncionario(null);
    this.aso = this.formularioAsoControle.value;
    this.aso.funcionario = this.funcionarioSelecionado;
    if (this.aso.asotipo.idasotipo === 5) {
      this.aso.funcionario.situacao = 'Inativo';
    } else if ( this.aso.asotipo.idasotipo === 4) {
      this.aso.funcionario.situacao = 'Ativo';
    }
    const idfuncao = this.funcionarioSelecionado.funcao.idfuncao;
    this.aso.funcionario.funcao = this.funcaoSelecionada;
    this.asocontroleService.getLast(this.aso.funcionario.idfuncionario).subscribe(resposta => {
      this.lastAsoControles = resposta as any;
      if (this.aso.funcionario.funcao.idfuncao !== idfuncao) {
        this.aso.funcionario.funcao = this.funcaoSelecionada;
        this.funcionarioService.atualizar(this.aso.funcionario).subscribe(resposta1 => {
          this.aso.funcionario = resposta1 as any;
        });
      }
      this.asocontroleService.salvar(this.aso).subscribe(resposta2 => {
        this.aso = resposta2 as any;
        if ( this.lastAsoControles != null ) {
          this.lastAsoControles.funcionario = this.aso.funcionario;
          this.lastAsoControles.finalizado = true;
          this.asocontroleService.atualizar(this.lastAsoControles).subscribe( resposta3 => {
            this.aso = resposta3 as any;
          });
        }
      });
      this.formularioAsoControle.reset();
      this.router.navigate(['/consasocontrole']);
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );


  }

  cancelar() {
    this.asocontroleService.setOp('');
    this.asocontroleService.setAso(null);
    this.funcionarioService.setFuncionario(null);
    this.formularioAsoControle.reset();
    this.router.navigate(['/consasocontrole']);
  }

  calcularDataVencimento()  {
    this.tipoSelecionado = this.formularioAsoControle.get('asotipo').value;

    let dataVencimento = this.formularioAsoControle.get('dataexame').value;
    const dias = this.tipoSelecionado.periodicidade;

    this.asocontroleService.calcularVencimento(dataVencimento, dias).subscribe(resposta => {
      dataVencimento = resposta as any;
      dataVencimento = moment(dataVencimento).format('YYYY-MM-DD');
      console.log(dataVencimento);
      this.formularioAsoControle.patchValue({
        datavencimento: dataVencimento
    });
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );

  }

  setFuncao() {
    this.funcaoSelecionada = this.formularioAsoControle.get('funcao').value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idfuncao === obj2.idfuncao : obj1 === obj2;
  }

  consultaFuncionario() {
    this.router.navigate(['/consfuncionario'] ,  { queryParams: {habilitarConsulta: true, rota: 'asocontrole'}});
  }


}
