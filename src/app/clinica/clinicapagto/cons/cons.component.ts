import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { PagSalutar } from 'src/app/asocontrole/model/PagSalutar';
import { Clinica } from '../../model/clinica';
import { LojaService } from 'src/app/loja/loja.service';
import { SalutarService } from 'src/app/asocontrole/salutar.service';
import { ClinicaService } from '../../clinica.service';
import { ClinicapagtoService } from '../clinicapagto.service';
import { Clinicapagto } from '../../model/Clinicapagto';

@Component({
  selector: 'app-cons',
  templateUrl: './cons.component.html',
  styleUrls: ['./cons.component.scss']
})
export class ConsComponent implements OnInit {

  formulario: FormGroup;
  lojas: Loja[];
  lojaSelecionada: Loja;
  isFirstOpen = false;
  oneAtATime: true;
  listaClinicaPagto: Clinicapagto[];
  clinica: Clinica;
  clinicas: Clinica[];

  constructor(
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private clinicaPagtoService: ClinicapagtoService,
    private clinicaService: ClinicaService,
  ) { }

  ngOnInit(): void {
    this.carregarComboBox();
    
    
    this.formulario = this.formBuilder.group({
      loja: [null],
      clinica: [null],
      mes: Date,
      ano: Date,
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

consultar() {
    this.clinicaPagtoService.listarClinicaPagto().subscribe(
      resposta => {
        this.listaClinicaPagto = resposta as any;
      }
    );
}

pesquisar(){

}

editar(clinicaPagto: Clinicapagto) {
  
}

limpar() {
  this.formulario.reset();
  this.lojaSelecionada = new Loja();
}


}