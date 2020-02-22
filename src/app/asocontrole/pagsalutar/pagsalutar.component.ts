import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { LojaService } from 'src/app/loja/loja.service';
import { SalutarService } from '../salutar.service';
import { PagSalutar } from '../model/PagSalutar';
import { Clinica } from 'src/app/clinica/model/clinica';
import { ClinicaService } from 'src/app/clinica/clinica.service';

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
  clinica: Clinica;
  clinicas: Clinica[];

  constructor(
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private salutarService: SalutarService,
    private clinicaService: ClinicaService,
  ) { }

  ngOnInit(): void {
    this.carregarComboBox();
    this.pagSalutar  = new PagSalutar();
    this.pagSalutar.loja = new Loja();
    this.pagSalutar.loja.nome = '';
    this.formulario = this.formBuilder.group({
      loja: [null],
      clinica: [null],
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
    this.clinicaService.listar().subscribe(resposta => {
      this.clinicas = resposta as any;
    });
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get('loja').value;
  }

  compararClinica(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setClinica() {
    this.clinica = this.formulario.get('clinica').value;
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