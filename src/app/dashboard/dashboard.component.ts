import { Component, OnInit, ViewChild, ElementRef, AbstractType } from '@angular/core';
import { AsoagendaService } from '../asoagenda/asoagenda.service';
import { Asoagenda } from '../asoagenda/model/asoagenda';
import { Treinamento } from '../treinamento/model/treinamento';
import { TreinamentoService } from '../treinamento/treinamento.service';
import { Contas } from '../contas/model/contas';
import { Clientes } from '../clientes/model/clientes';
import { ClientesService } from '../clientes/clientes.service';
import { ContasService } from '../contas/contas.service';
import { AuthService } from '../usuario/login/auth.service';
import * as moment from 'moment';
import { Treinamentoparticipante } from '../treinamento/model/treinamentoparticipante';
import { Funcionario } from '../funcionario/model/funcionario';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { Contratoexp } from '../funcionario/model/Contratoexp';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;

  clicked: boolean;

  asoAgendas: Asoagenda[];
  treinamentos: Treinamento[];
  listaContas: Contas[];
  listaClientes: Clientes[];
  master:boolean;
  comercial: boolean;
  listaContratoExp: Contratoexp[];
  listaAniversario: Funcionario[]; 

  constructor(
    private asoAgendaService: AsoagendaService,
    private treinamentoService: TreinamentoService,
    private clientesService: ClientesService,
    private contasService: ContasService,
    private authService: AuthService,
    private funcionarioService: FuncionarioService,
  ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    if (this.authService.getUsuario().acesso.nome === 'Master') {
      this.listarAniversariosFuncionarios();
      this.listarFuncionariosContratos();
      this.master = true;
      this.comercial = false;
      console.log(this.master);
      this.asoAgendaService.pesquisarData7().subscribe(
        resposta => {
          this.asoAgendas = resposta as any;
        }
      );
      this.treinamentoService.listar7Dias().subscribe(
        resposta2 => {
          this.treinamentos = resposta2 as any;
        }
      );
    } else if (this.authService.getUsuario().acesso.nome === 'Comercial') {
      this.master = false;
      this.comercial = true;
      this.gerarDashBoardComercial();
    }
  }


  setClicked(val: boolean): void {
    this.clicked = val;
  }

  gerarDashBoardComercial() {
    console.log('comercial');
    this.contasService.getTodasDashboardCR().subscribe(
      resposta => {
        this.listaContas = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
    this.clientesService.getAniversariantes().subscribe(
      resposta => {
        this.listaClientes = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  listarFuncionariosContratos() {
    this.funcionarioService.findcontrato().subscribe(
      resposta => {
        this.listaContratoExp = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  listarAniversariosFuncionarios() {
    this.funcionarioService.getAniversariantes().subscribe(
      resposta => {
        this.listaAniversario = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

}
