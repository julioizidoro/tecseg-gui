import { Component, OnInit } from '@angular/core';
import { Epi } from '../../model/epi';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventLoopMonitorOptions } from 'perf_hooks';
import { Epitipo } from '../../tipo/model/epitipo';
import { EpiService } from '../epi.service';
import { EpitipoService } from '../../tipo/epitipo.service';

@Component({
  selector: 'app-consepi',
  templateUrl: './consepi.component.html',
  styleUrls: ['./consepi.component.scss']
})
export class ConsepiComponent implements OnInit {

  listaEpi: Epi[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;
  epiTipo: Epitipo;
  listaEpiTipo: Epitipo[];
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private epiService: EpiService,
    private epiTipoService: EpitipoService,
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      descricao: [null],
      epitipo: [null],
    });
    this.consultar();
  }

  consultar() {
    this.epiService.listar('@').subscribe(
      resposta => {
        this.listaEpi = resposta as any;
      }
    );
  }

  carregarComboBox() {
    this.epiTipoService.listar('@').subscribe(resposta => {
      this.listaEpiTipo = resposta as any;
    });
  }

  compararTipo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setTipo() {
    this.epiTipo = this.formulario.get('epitipo').value;
  }

  pesquisar() {
      let descricao = this.formulario.get('descricao').value;
      if (descricao!= null){
        this.epiService.listar(descricao).subscribe(
          resposta => {
            this.listaEpi = resposta as any;
          }
        );  
      } else {
        if (this.epiTipo != null){
          this.epiService.listarEpiTipo(this.epiTipo.idepitipo).subscribe(
            resposta => {
              this.listaEpi = resposta as any;
            }
         );
        }  
      }
  }

  editar( epi: Epi) {
    this.epiService.setEpi(epi); 
    this.router.navigate(['/cadEpi']);
}

baixar( epi: Epi) {
  this.epiService.setEpi(epi); 
  this.router.navigate(['/cadEpi']);
}


}
