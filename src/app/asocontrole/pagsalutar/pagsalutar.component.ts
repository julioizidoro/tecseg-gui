import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { LojaService } from 'src/app/loja/loja.service';
import { SalutarService } from '../salutar.service';
import { PagSalutar } from '../model/PagSalutar';

@Component({
  selector: 'app-pagsalutar',
  templateUrl: './pagsalutar.component.html',
  styleUrls: ['./pagsalutar.component.scss']
})
export class PagsalutarComponent implements OnInit {

  formulario: FormGroup;
  lojas: Loja[];
  lojaSelecionada: Loja;
  isFirstOpen = false;
  oneAtATime: true;
  pagSalutar: PagSalutar;

  constructor(
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private salutarService: SalutarService
  ) { }

  ngOnInit(): void {
    this.carregarComboBox();
    this.pagSalutar  = new PagSalutar();
    this.pagSalutar.loja = new Loja();
    this.pagSalutar.loja.nome = '';
    this.formulario = this.formBuilder.group({
      loja: [null],
      datainicial: Date,
      datafinal: Date,
    });
    this.formulario.reset();
    this.lojaSelecionada = null;
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

calcular() {
    const dataI  = this.formulario.get('datainicial').value;
    const dataF = this.formulario.get('datafinal').value;
    this.salutarService.calcularValorSalutar(dataI, dataF, this.lojaSelecionada.idloja).subscribe(
      resposta => {
        this.pagSalutar = resposta as any;
      }
    );
}

limpar() {
  this.formulario.reset();
  this.lojaSelecionada = new Loja();
}


}