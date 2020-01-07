import { Component, OnInit } from '@angular/core';
import { Treinamento } from '../model/treinamento';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TreinamentoService } from '../treinamento.service';
import { Loja } from 'src/app/loja/model/loja';
import { Router } from '@angular/router';
import { Treinamentotipo } from '../model/treinamentotipo';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { environment as env } from '../../../environments/environment.prod';

@Component({
  selector: 'app-constreinamento',
  templateUrl: './constreinamento.component.html',
  styleUrls: ['./constreinamento.component.scss']
})
export class ConstreinamentoComponent implements OnInit {

  treinamentos: Treinamento[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime = true;

  constructor(
    private treinamentoService: TreinamentoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private funcionarioService: FuncionarioService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      datainicial: Date,
      datafinal: Date,
      situacao: [null]
    });
    this.consultar();
  }

  consultar() {
    this.treinamentoService.listar().subscribe(
      resposta => {
        this.treinamentos = resposta as any;
      }
    );
}

novo() {
  this.treinamentoService.setTreinamento(null);
  this.router.navigate([ '/cadtreinamento']);
}

editar(treinamento: Treinamento) {
  this.treinamentoService.setTreinamento(treinamento);
  this.router.navigate([ '/cadtreinamento']);
}

finalizar(treinamento: Treinamento) {
  treinamento.situacao = 'Finalizado';
  treinamento.usuario = this.authService.getUsuario();
  this.treinamentoService.salvar(treinamento).subscribe(resposta => {
    treinamento = resposta as any;
    this.consultar();
  });
}

cancelar(treinamento: Treinamento) {
  treinamento.situacao = 'Cancelado';
  treinamento.usuario = this.authService.getUsuario();
  this.treinamentoService.salvar(treinamento).subscribe(resposta => {
    treinamento = resposta as any;
    this.consultar();
  });
}

imprimir(treinamento: Treinamento) {
  const uri =  env.baseApiUrl + 'treinamentos/listapresenca/' + treinamento.idtreinamento;
  return uri;
}

participantes(treinamento: Treinamento) {
  this.treinamentoService.setTreinamento(treinamento);
  this.funcionarioService.setRota('treinamento');
  this.router.navigate([ '/consfuncionario']);
}

listarParticipantes(t: Treinamento) {
  this.treinamentoService.setTreinamento(t);
  this.router.navigate([ '/listatreinamento']);
}

pesquisar(){

}

pesquisarLimpar() {
  
}

}
