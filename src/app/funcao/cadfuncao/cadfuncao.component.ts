import { Component, OnInit } from '@angular/core';
import { Funcao } from '../model/funcao';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br';
import { FuncaoService } from '../funcao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadfuncao',
  templateUrl: './cadfuncao.component.html',
  styleUrls: ['./cadfuncao.component.scss']
})
export class CadfuncaoComponent implements OnInit {

  formulario: FormGroup;
  funcao: Funcao;
  validateBrService: ValidateBrService;
  public maskCBO = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private funcaoService: FuncaoService,
  ) { }



  ngOnInit() {
    this.funcao = this.funcaoService.getFuncao();
    if (this.funcao==null){
      this.formulario = this.formBuilder.group({
        idfuncao: [null],
        nome: [null, Validators.required],
        cbo: [null, Validators.required],
      });
    } else {
      this.formulario = this.formBuilder.group({
        idfuncao: this.funcao.idfuncao,
        nome: [this.funcao.nome, Validators.required],
        cbo: [this.funcao.cbo, Validators.required],
      });
    }
  }

  salvar() {
    this.funcao = this.formulario.value;
    this.funcaoService.salvar(this.funcao).subscribe(resposta => {
      this.funcao = resposta as any;
      this.funcaoService.setFuncao(null);
      this.formulario.reset();
      this.router.navigate([ '/consfuncao']);
    },
    err => {
      console.log(err.error.erros.join(' '));
    });
  }

  cancelar() {
    this.funcaoService.setFuncao(null);
    this.formulario.reset();
    this.router.navigate([ '/consfuncao']);
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
