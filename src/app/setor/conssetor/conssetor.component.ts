import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Funcao } from 'src/app/funcao/model/funcao';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { Router } from '@angular/router';
import { SetorService } from '../setor.service';
import { Setor } from '../model/setor';

@Component({
  selector: 'app-conssetor',
  templateUrl: './conssetor.component.html',
  styleUrls: ['./conssetor.component.scss']
})
export class ConssetorComponent implements OnInit {

  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime = true;
  setores: Setor[];


  constructor(
    private setorService: SetorService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      idsetor: [null],
      nome: [null],
    });
    this.consultar();
  }

  consultar() {
    this.setorService.listar().subscribe(resposta => {
      this.setores = resposta as any;
    });
  }

  editar(setor: Setor) {
    this.setorService.setSetor(setor);
    this.router.navigate([ '/cadsetor']);
  }

  novo() {
    this.setorService.setSetor(null);
    this.router.navigate([ '/cadsetor']);
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
