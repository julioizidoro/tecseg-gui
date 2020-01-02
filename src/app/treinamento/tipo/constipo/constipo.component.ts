import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Treinamentotipo } from '../../model/treinamentotipo';
import { TreinamentoService } from '../../treinamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-constipo',
  templateUrl: './constipo.component.html',
  styleUrls: ['./constipo.component.scss']
})
export class ConstipoComponent implements OnInit {

  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime = true;
  treinamentos: Treinamentotipo[];

  constructor(
    private formBuilder: FormBuilder,
    private treinamentoService: TreinamentoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null ],
      tipo: [null],
    });
    this.consultar();
  }

  consultar() {
    this.treinamentoService.listarTipo().subscribe(resposta => {
      this.treinamentos = resposta as any;
    });
  }

  editar(treinamento: Treinamentotipo) {
    this.treinamentoService.setTreinamentoTipo(treinamento);
    this.router.navigate([ '/cadtreinamentotipo']);
  }

  novo() {
    this.treinamentoService.setTreinamentoTipo(null);
    this.router.navigate([ '/cadtreinamentotipo']);
  }

  pesquisar() {
    let nome: string = this.formulario.get('nome').value;
    if (nome === null) {
      nome = '';
    }
    let tipo: string = this.formulario.get('tipo').value;
    if (nome.length > 0) {
      this.treinamentoService.listarTipoNome(nome).subscribe(resposta => {
        this.treinamentos = resposta as any;
      });
    } else if ( tipo.length>0) {
      this.treinamentoService.listarTipoTipo(tipo).subscribe(resposta => {
        this.treinamentos = resposta as any;
      });
    }
  }

  pesquisarLimpar() {
    this.consultar();
  }

}
