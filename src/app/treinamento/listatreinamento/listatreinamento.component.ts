import { Router } from '@angular/router';
import { FuncionarioService } from './../../funcionario/funcionario.service';
import { Treinamentoparticipante } from './../model/treinamentoparticipante';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TreinamentoService } from '../treinamento.service';
import { Treinamento } from '../model/treinamento';
import { ModalDirective } from 'angular-bootstrap-md';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Funcao } from 'src/app/funcao/model/funcao';

@Component({
  selector: 'app-listatreinamento',
  templateUrl: './listatreinamento.component.html',
  styleUrls: ['./listatreinamento.component.scss'],
  exportAs: 'child'
})
export class ListatreinamentoComponent implements OnInit {

  participantes: Treinamentoparticipante[];
  trenamentoFinalizado: boolean;
  treinamento: Treinamento;
  participante: Treinamentoparticipante;
  nota: number;
  compareceu : boolean;
  @ViewChild('notas') showModalNotasOnClick: ModalDirective;

  constructor(
    private treinamentoService: TreinamentoService,
    private funcionarioService: FuncionarioService,
    private router: Router,
  ) { 

    
  }

  ngOnInit() {
    this.treinamento = this.treinamentoService.getTreinamento();
    this.participante = new Treinamentoparticipante();
    this.participante.funcionario = new Funcionario();
    this.participante.funcionario.nome = 'nome';
    this.participante.funcionario.funcao = new Funcao();
    this.participante.funcionario.funcao.nome = ' ';
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
        let retorno = reposta as any;
        this.removerParticipante(participante);
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  removerParticipante(participante: Treinamentoparticipante) {
    let lista: Treinamentoparticipante[];
    lista = [];
    for (let i = 0; i < this.participantes.length; i++) {
      if (this.participantes[i].funcionario.idfuncionario != participante.funcionario.idfuncionario) {
        lista.push(this.participantes[i]);   
      }
    }
    this.participantes = lista;
  }

  addParticipantes() {
    this.treinamentoService.setTreinamento(this.treinamento);
    this.funcionarioService.setRota('listatreinamento');
    this.router.navigate([ '/consfuncionario']);
  }

  atualizarParticipante(participante: Treinamentoparticipante) {
    for (let i = 0; i < this.participantes.length; i++) {
      if (this.participantes[i].funcionario.idfuncionario === participante.funcionario.idfuncionario) {
        this.participantes[i] = participante;   
        i = this.participantes.length+100;
      }
    }
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
    this.treinamentoService.salvarNotaParticipante(this.participante).subscribe(
      resposta => {
        this.participante = resposta as any;
        this.atualizarParticipante(this.participante);
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  cancelarNota() {
    this.showModalNotasOnClick.hide();
  }

  voltarTreinamento() {
    this.router.navigate(['/constreinamento']);
  }
}
