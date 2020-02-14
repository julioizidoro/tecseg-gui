import { Component, OnInit } from '@angular/core';
import { Epi } from '../../model/epi';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EpitipoService } from '../../tipo/epitipo.service';
import { EpiService } from '../epi.service';
import { Epitipo } from '../../tipo/model/epitipo';
import { Estoque } from 'src/app/estoque/model/estoque';
import { EstoqueService } from 'src/app/estoque/estoque.service';

@Component({
  selector: 'app-cadepi',
  templateUrl: './cadepi.component.html',
  styleUrls: ['./cadepi.component.scss']
})
export class CadepiComponent implements OnInit {

  epi: Epi;
  formulario: FormGroup;
   devolver: string;
   epiTipo: Epitipo;
  listaEpiTipo: Epitipo[];
  estqoue: Estoque;
  listaEstoque: Estoque[];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private epiTipoService: EpitipoService,
    private epiService: EpiService,
    private estoqueService: EstoqueService,

  ) { }

  ngOnInit(): void {
    this.carregarComboBox();
    this.epi = this.epiService.getEpi();
    if (this.epi == null) {
      this.formulario = this.formBuilder.group({
        idepi: [null],
        diasrevisao: [null],
        diasvalidade: [null],
        devolver: ['Não'],
        epitipo: [null],
        estoque: [null],
      });
    } else {
      this.formulario = this.formBuilder.group({
        idepi: this.epi.idepi,
        diasrevisao: this.epi.diasrevisao,
        diasvalidade: this.epi.diasvalidade,
        devolver: this.epi.devolver,
        epitipo: this.epi.idepi,
        estoque: this.epi.estoque,
      });
    }

  }

  carregarComboBox() {
    this.epiTipoService.listar('@').subscribe(resposta => {
      this.listaEpiTipo = resposta as any;
    });
    this.estoqueService.listarProdutoGrupo(1).subscribe(resposta => {
      this.listaEstoque = resposta as any;
    });
  }

  
  salvar() {
    this.epi = this.formulario.value;
    this.epi.devolver = this.devolver;
    this.epi.epitipo = this.epiTipo;
    this.epiService.salvar( this.epi).subscribe(
      resposta => {
        this.epi = resposta as any;
        this.epiService.setEpi(null);
        this.router.navigate(['/consepi']);
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  cancelar() {
    this.epiService.setEpi(null);
    this.router.navigate([ '/consepi']);
  }
}