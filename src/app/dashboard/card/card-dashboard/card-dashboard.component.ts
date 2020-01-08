import { DashboardService } from './../../dashboard.service';
import { Numeroasos } from './../../model/numeroasos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss']
})
export class CardDashboardComponent implements OnInit {

  numeroAsos: Numeroasos;
  vencido: number;
  vencer90: number;
  vencer90m: number;
  wdvencido: string;

  constructor(
    private dashBoardService: DashboardService,
  ) { }

  ngOnInit() {
    this.vencer90 = 0;
    this.vencer90m = 0;
    this.vencido = 0;
    this.numeroAsos = new Numeroasos();
    this.dashBoardService.getNumeros().subscribe(
      resposta => {
        this.numeroAsos = resposta as any;
        this.calcularPercentual();
      }
    );
  }

  calcularPercentual() {
    this.vencido =  50;//(this.numeroAsos.vencidos * 100) / this.numeroAsos.total;
    this.wdvencido = 'width: ' + this.vencido +  '%;';
    console.log(this.wdvencido);
  }

}
