import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AsoagendaService } from '../asoagenda/asoagenda.service';
import { Asoagenda } from '../asoagenda/model/asoagenda';
import { Treinamento } from '../treinamento/model/treinamento';
import { TreinamentoService } from '../treinamento/treinamento.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  clicked: boolean;

  asoAgendas: Asoagenda[];
  treinamentos: Treinamento[];

  constructor(
    private asoAgendaService: AsoagendaService,
    private treinamentoService: TreinamentoService,
  ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
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
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

}
