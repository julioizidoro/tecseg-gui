import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuncaoService } from '../funcao.service';
import { Router } from '@angular/router';
import { Funcao } from '../model/funcao';

@Component({
  selector: 'app-consfuncao',
  templateUrl: './consfuncao.component.html',
  styleUrls: ['./consfuncao.component.scss']
})
export class ConsfuncaoComponent implements OnInit {

  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime = true;
  funcoes: Funcao;
  public maskCBO = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];


  constructor(
    private funcaoService: FuncaoService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      idfuncao: [null],
      nome: [null, Validators.required],
      cbo: [null, Validators.required],
    });
    this.consultar();
  }

  consultar() {
    this.funcaoService.listar().subscribe(resposta => {
      this.funcoes = resposta as any;
    });
  }

  editar(funcao: Funcao) {
    this.funcaoService.setFuncao(funcao);
    this.router.navigate([ '/cadfuncao']);
  }

  novo() {
    this.funcaoService.setFuncao(null);
    this.router.navigate([ '/cadfuncao']);
  }

  pesquisar() {
    let funcao = this.formulario.value;
    if (funcao.nome !=null ) {
      this.funcaoService.getNome(funcao.nome);
    } else if ( funcao.cbo !=null ) {
      this.funcaoService.getCBO(funcao.cbo);
    }
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

  pesquisarLimpar() {
    this.consultar();
  }

}
