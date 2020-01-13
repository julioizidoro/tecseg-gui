import { Router } from '@angular/router';
import { FuncionarioService } from './../../funcionario/funcionario.service';
import { Treinamentoparticipante } from './../model/treinamentoparticipante';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TreinamentoService } from '../treinamento.service';
import { Treinamento } from '../model/treinamento';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-listatreinamento',
  templateUrl: './listatreinamento.component.html',
  styleUrls: ['./listatreinamento.component.scss']
})
export class ListatreinamentoComponent implements OnInit {

  participantes: Treinamentoparticipante[];
  trenamentoFinalizado: boolean;
  treinamento: Treinamento;
  participante: Treinamentoparticipante;
  nota: number;
  compareceu : boolean;
  @ViewChild('notas', null) public showModalNotasOnClick: ModalDirective;

  constructor(
    private treinamentoService: TreinamentoService,
    private funcionarioService: FuncionarioService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.participantes = [];
    this.treinamento = this.treinamentoService.getTreinamento();
    if (this.treinamento.situacao === 'Agendado') {
      this.trenamentoFinalizado = false;
    } else {
      this.trenamentoFinalizado = true;
    }
    this.treinamentoService.listarParticipante (this.treinamento.idtreinamento).subscribe(
        resposta => {
          this.participantes = resposta as any;
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      );
  }

  removerTreinamentoFuncionario(participante: Treinamentoparticipante) {
    this.treinamentoService.deletarParticipante(participante).subscribe(
      reposta => {
        participante = reposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  addParticipantes() {
    this.treinamentoService.setTreinamento(this.treinamento);
    this.funcionarioService.setRota('listatreinamento');
    this.router.navigate([ '/consfuncionario']);
  }

  presentaNota(participante: Treinamentoparticipante) {
    this.participante = participante;
    this.nota = participante.nota;
    this.compareceu = participante.compareceu;
    this.showModalNotasOnClick.show();
  }

  confirmarNota() {
    this.showModalNotasOnClick.hide();
    this.participante.nota = this.nota;
    this.participante.compareceu = this.compareceu;
  //  this.treinamentoService.salvarParticipante(this.participante).subscribe(
    //  resposta => {
      //  this.participante = resposta as any;
     // },
    ///  err => {
     //   console.log(err.error.erros.join(' '));
    //  }
   // );
  }

  cancelarNota() {
    this.showModalNotasOnClick.hide();
  }

  voltarTreinamento() {
    this.router.navigate(['/constreinamento']);
  }
}