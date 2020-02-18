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

  constructor(
    private asoAgendaService: AsoagendaService,
    private treinamentoService: TreinamentoService,
    private clientesService: ClientesService,
    private contasService: ContasService,
    private authService: AuthService,
  ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.master = false;
    this.comercial =false;
    if (this.authService.getUsuario().acesso.nome === 'Master') {
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
      this.gerarDashBoardComercial();
    }
  }


  setClicked(val: boolean): void {
    this.clicked = val;
  }

  gerarDashBoardComercial() {
    let dataInicial: Date;
    let dataFinal: Date;
    dataInicial = new Date();
    dataFinal = new Date();
    dataInicial.setDate(dataInicial.getDate() - 15);
    dataFinal.setDate(dataFinal.getDate() + 30)
    this.contasService.pesquisarTodasVencimentoCR((moment(dataInicial, 'dd/MM/yyyy').format('dd/MM/yyyy')), (moment(dataFinal, 'dd/MM/yyyy').format('dd/MM/yyyy')), '@').subscribe(
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

}
