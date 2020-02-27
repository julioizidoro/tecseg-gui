import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { Clinicapagto } from '../../model/Clinicapagto';
import { Clinica } from '../../model/clinica';
import { LojaService } from 'src/app/loja/loja.service';
import { ClinicapagtoService } from '../clinicapagto.service';
import { ClinicaService } from '../../clinica.service';

@Component({
  selector: 'app-cadpagto',
  templateUrl: './cadpagto.component.html',
  styleUrls: ['./cadpagto.component.scss']
})
export class CadpagtoComponent implements OnInit {

  formulario: FormGroup;
  clinicaPagto: Clinicapagto;
 
  constructor(
    private formBuilder: FormBuilder,
    private clinicaPagtoService: ClinicapagtoService,
   ) { }

  ngOnInit(): void {
    this.clinicaPagto = this.clinicaPagtoService.getClinicaPagto();
    this.formulario = this.formBuilder.group({
      idclinicapagto: this.clinicaPagto.idclinicapagto,
      funcionarios: this.clinicaPagto.funcionarios,
      valorfuncionarios: this.clinicaPagto.valorfuncionarios,
      valorexames: this.clinicaPagto.valorexames,
      valortotal: this.clinicaPagto.valortotal,
      mesano: this.clinicaPagto.mesano,
      clinica: this.clinicaPagto.clinica,
      loja: this.clinicaPagto.loja,
      usuario: this.clinicaPagto.usuario,
      clinicapagtoexameList: this.clinicaPagto.clinicapagtoexameList,
    });
   
  }

 

 

}