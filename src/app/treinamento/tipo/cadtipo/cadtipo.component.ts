import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br';
import { Treinamentotipo } from '../../model/treinamentotipo';
import { Router } from '@angular/router';
import { TreinamentoService } from '../../treinamento.service';

@Component({
  selector: 'app-cadtipo',
  templateUrl: './cadtipo.component.html',
  styleUrls: ['./cadtipo.component.scss']
})
export class CadtipoComponent implements OnInit {

  formulario: FormGroup;
  validateBrService: ValidateBrService;
  treinamento: Treinamentotipo;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private treinamentoService: TreinamentoService,
  ) { }

  ngOnInit() {
    this.treinamento = this.treinamentoService.getTreinamentoTipo();
    if (this.treinamento == null) {
      this.formulario = this.formBuilder.group({
        idtreinamentotipo: [null],
        nome: [null, Validators.required],
        complementotitulo: [null],
        periodicidade: [null, Validators.required],
        tipo: [null],
        conteudo:[null],
      });
    } else {
      this.formulario = this.formBuilder.group({
          idtreinamentotipo: this.treinamento.idtreinamentotipo,
          nome: [this.treinamento.nome, Validators.required],
          complementotitulo: [this.treinamento.complementotitulo, Validators.required],
          periodicidade: [this.treinamento.periodicidade, Validators.required],
          tipo: this.treinamento.tipo,
          conteudo: this.treinamento.conteudo,
        });
    }

  }

  salvar() {
    this.treinamento = this.formulario.value;
    this.treinamentoService.salvarTipo(this.treinamento).subscribe(resposta => {
      this.treinamento = resposta as any;
      this.treinamentoService.setTreinamentoTipo(null);
      this.formulario.reset();
      this.router.navigate([ '/constreinamentotipo']);
    },
    err => {
      console.log(err.error.erros.join(' '));
    });
  }

  cancelar() {
    this.treinamentoService.setTreinamentoTipo(null);
    this.formulario.reset();
    this.router.navigate([ '/constreinamentotipo']);
  }

  verificarValidTouched(campo) {
    return (!this.formulario.get(campo).valid && this.formulario.get(campo).touched);
  }

  aplicaCssErro(campo) {
    return {
      'has-error' : this.verificarValidTouched(campo),
      'has-feedback' : this.verificarValidTouched(campo)
    };
  }

}

