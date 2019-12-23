import { Component, OnInit, ViewChild } from '@angular/core';
import { Salutar } from '../../model/salutar';
import { Loja } from 'src/app/loja/model/loja';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LojaService } from 'src/app/loja/loja.service';
import { SalutarService } from '../../salutar.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-conssalutar',
  templateUrl: './conssalutar.component.html',
  styleUrls: ['./conssalutar.component.scss']
})
export class ConssalutarComponent implements OnInit {

  salutar: Salutar[];
  lojas: Loja[];
  isFirstOpen = false;
  oneAtATime: true;
  formulario: FormGroup;
  sformulario: FormGroup;
  lojaSelecionada: Loja;
  @ViewChild('gerarSalutar', null) public showModalGerarSalutarOnClick: ModalDirective;

  constructor(
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private salutarService: SalutarService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.carregarComboBox();
    this.consultar();
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
    });
    this.sformulario = this.formBuilder.group({
      idsalutar: [null],
      nome: [null],
      dataemissao: new Date(),
      loja: [null],
      usuario: this.authService.getUsuario(),
      uri: [null],
    });
  }


  carregarComboBox() {
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get('loja').value;
  }

  pesquisar(){

  }

  limpar(){

  }

  consultar() {
    this.salutarService.listar().subscribe(
      resposta => {
        this.salutar = resposta as any;
      }
    );
}

gerar() {
  this.sformulario = this.formBuilder.group({
    idsalutar: [null],
    nome: [null],
    dataemissao: new Date(),
    loja: [null],
    usuario: this.authService.getUsuario(),
    uri: [null],
  });
  this.showModalGerarSalutarOnClick.show();
}

salvar(){

}

cancelar(){
  this.sformulario.reset();
  this.showModalGerarSalutarOnClick.hide();
}

}
