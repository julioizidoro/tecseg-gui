import { Component, OnInit } from '@angular/core';
import { Treinamento } from '../model/treinamento';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TreinamentoService } from '../treinamento.service';
import { Loja } from 'src/app/loja/model/loja';

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
  ) {
    this.consultar();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      dataInicio: Date,
      dataFinal: Date,
      loja: Loja,
      situacao: [null]
    });
  }

  consultar() {
    this.treinamentoService.listar().subscribe(
      resposta => {
        this.treinamentos = resposta as any;
      }
    );
}

}
