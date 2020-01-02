import { Component, OnInit } from '@angular/core';
import { Treinamento } from '../model/treinamento';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TreinamentoService } from '../treinamento.service';
import { Loja } from 'src/app/loja/model/loja';
import { Router } from '@angular/router';
import { Treinamentotipo } from '../model/treinamentotipo';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-constreinamento',
  templateUrl: './constreinamento.component.html',
  styleUrls: ['./constreinamento.component.scss']
})
export class ConstreinamentoComponent implements OnInit {

  treinamentos: Treinamento[];
  formulario: FormGroup;
  

  constructor(
    private treinamentoService: TreinamentoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
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

imprimir(trinemanto: Treinamento) {
  
}

}
