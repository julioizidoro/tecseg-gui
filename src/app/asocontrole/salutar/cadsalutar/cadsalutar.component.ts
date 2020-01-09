import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LojaService } from 'src/app/loja/loja.service';
import { SalutarService } from '../../salutar.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Loja } from 'src/app/loja/model/loja';
import { Salutar } from '../../model/salutar';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Salutarfuncionario } from '../../model/salutarfuncionario';
import { TypeaheadOptions } from 'ngx-bootstrap';
import { AlertModelService } from 'src/app/share/alert-model.service';


@Component({
  selector: 'app-cadsalutar',
  templateUrl: './cadsalutar.component.html',
  styleUrls: ['./cadsalutar.component.scss']
})
export class CadsalutarComponent implements OnInit {

  lojas: Loja[];
  salutar: Salutar;
  isFirstOpen = true;
  oneAtATime: true;
  formulario: FormGroup;
  funcionarios: Funcionario[];
  iniciou: boolean;
  sf: Salutarfuncionario;
  botaoiniciar: boolean;
  salutarFuncionario: Salutarfuncionario[];
  executarSpiner = false;

  constructor(
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private salutarService: SalutarService,
    private authService: AuthService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private alertService: AlertModelService,
  ) { }

  ngOnInit() {
    this.botaoiniciar = true;
    this.iniciou = false;
    this.salutar = new Salutar();
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      nome: [null],
      datainicial: [null],
      datafinal: [null],
      loja: [null],
      todos: [true],
      admitidos: [null],
      afastados: [null],
      inativos: [null],
      ativos: [null],
    });
  }

  carregarComboBox() {
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
  }

  gerarListaFuncionarios() {
    const loja = this.formulario.get('loja').value;
    const dataincio = this.formulario.get('datainicial').value;
    const datafinal = this.formulario.get('datafinal').value;
    if ((dataincio != null) && (datafinal != null) && (loja != null)) {
      this.executarSpiner = true;
      this.funcionarioService.getLojaData(loja.idloja, dataincio, datafinal).subscribe(resposta => {
        this.funcionarios = resposta as any;
        this.gerarLista(dataincio, datafinal);
      },
      err => {
        console.log(err.error.erros.join(' '));
        this.handleError('Erro ao gerar planilha', 'danger');
      }
      );
    } else if (loja != null) {
      this.executarSpiner = true;
      this.funcionarioService.getLoja(loja.idloja).subscribe(resposta => {
        this.funcionarios = resposta as any;
        this.gerarLista(null, null);
      },
      err => {
        console.error(err);
        this.handleError('Erro ao gerar planilha', 'danger');
      }
      );
    }
  }

  calcularNumeroTodos() {
   for (const sf of this.salutarFuncionario) {
   if (sf.situacao === 'Adminitido') {
    this.salutar.admitidos = this.salutar.admitidos + 1;
   } else if (sf.situacao === 'Ativo') {
     this.salutar.ativos = this.salutar.ativos + 1;
   } else if (sf.situacao === 'Afastado') {
     this.salutar.afastados = this.salutar.afastados + 1;
   } else if (sf.situacao === 'Inativo') {
     this.salutar.inativos = this.salutar.inativos + 1;
   }
   this.salutar.total = this.salutar.total + 1;
  }
}

gerarLista(datainicio: Date, datafinal: Date) {
  this.salutar.loja = this.formulario.get('loja').value;
  this.salutar.dataemissao = new Date();
  this.salutar.usuario = this.authService.getUsuario();
  this.salutar.nome = this.formulario.get('nome').value;
  this.salutar.admitidos = 0;
  this.salutar.ativos = 0;
  this.salutar.afastados = 0;
  this.salutar.inativos = 0;
  this.salutar.total = 0;
  const todos = this.formulario.get('todos').value;
    const admitidos = this.formulario.get('admitidos').value;
    const afastados = this.formulario.get('afastados').value;
    const inativos = this.formulario.get('inativos').value;
    const ativos = this.formulario.get('ativos').value;
    let adicionar = false;
  if ((this.funcionarios != null) && ( this.funcionarios.length>0)) {
    this.salutarFuncionario = [];

    for (const f of this.funcionarios) {
      adicionar = false;
      const s = Salutarfuncionario;
      this.sf = new Salutarfuncionario();
      this.sf.datasituacao = f.datasituacao;
      this.sf.funcao = f.funcao;
      this.sf.funcionario = f;
      this.sf.setor = f.setor;
      this.sf.situacao = f.situacao;
      if (todos) {
        this.salutarFuncionario.push(this.sf);
      } else {
        if (admitidos) {
          if ((datainicio != null) && (datafinal != null)) {
            if ((f.dataadmissao >= datainicio) && (f.dataadmissao <= datafinal) && f.situacao === 'Ativo') {
              adicionar = true;
              this.sf.situacao = 'Admitido';
            }
          }
        }
        if (ativos) {
          if (f.situacao === 'Ativo') {
            adicionar = true;
          }
        }
        if (afastados) {
          if (f.situacao === 'Afastado') {
            adicionar = true;
          }
        }
        if (inativos) {
          if (f.situacao === 'Inativo') {
            adicionar = true;
          }
        }
        if (adicionar) {
          this.salutarFuncionario.push(this.sf);
        }
      }
    }
    this.handleError('Planilha gerada com sucesso.', 'success');
  } else {
      this.handleError('Nenhum funcionário localizado', 'warning');
  }
  this.executarSpiner = false;
}


  setSituacaoTodos() {
    if (this.formulario.get('todos').value === true) {
      this.formulario.get('admitidos').setValue(false);
      this.formulario.get('afastados').setValue(false);
      this.formulario.get('inativos').setValue(false);
      this.formulario.get('ativos').setValue(false);
    }
  }

  setSituacaoOutros() {
    if (this.formulario.get('admitidos').value === true) {
      this.formulario.get('todos').setValue(false);
    } else if (this.formulario.get('afastados').value === true) {
      this.formulario.get('todos').setValue(false);
    } else if (this.formulario.get('inativos').value === true) {
      this.formulario.get('todos').setValue(false);
    } else if (this.formulario.get('Ativos').value === true) {
      this.formulario.get('todos').setValue(false);
    }
  }

  iniciar() {
    this.gerarListaFuncionarios();
    this.iniciou = true;
  }

  salvar() {
    this.calcularNumeroTodos();
    this.salutarService.salvar(this.salutar).subscribe(resposta => {
      this.salutar = resposta as any;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.salutarFuncionario.length; i++) {
        this.salutarFuncionario[i].salutar = this.salutar;
      }
      this.salutarService.salvarSalutarFuncionario(this.salutarFuncionario).subscribe(
        reposta1 => {
          this.salutarFuncionario = reposta1 as any;
          this.salutarService.setSalutar(null);
          this.router.navigate(['/conssalutar']);
        },
        err1 => {
          console.log(err1.error.erros.join(' '));
        }
      );
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );
  }


  cancelar() {
    this.salutarService.setSalutar(null);
    this.router.navigate(['/conssalutar']);
  }

  reiniciar() {
    this.iniciou = false;
    this.salutar = new Salutar();
    this.formulario.reset();
    this.formulario = this.formBuilder.group({
      nome: [null],
      datainicial: [null],
      datafinal: [null],
      loja: [null],
      todos: [true],
      admitidos: [null],
      afastados: [null],
      inativos: [null],
      ativos: [null],
    });
    this.salutarFuncionario = [];
    this.verificarBotaoIniciar();
  }

  verificarBotaoIniciar() {
    const loja = this.formulario.get('loja').value;
    const nome = this.formulario.get('nome').value;
    if (( loja == null) || ( nome == null)) {
      this.botaoiniciar = true;
    } else {
      this.botaoiniciar = false;
    }
  }

  handleError(msg: string, tipo:string) {
    if (tipo === 'danger') {
      this.alertService.showAlertDanger(msg);
    } else if ( tipo === 'warning') {
      this.alertService.showAlertWarning(msg);
    } else if ( tipo === 'success') {
      this.alertService.showAlertSuccess(msg);
    } 
    
  }
}
