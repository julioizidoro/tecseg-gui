import { Component, OnInit } from '@angular/core';
import { Relatorioseguranca } from '../../model/relatorioseguranca';
import { RelatoriosegurancaService } from '../../relatorioseguranca.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment as env } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-consrelatorio',
  templateUrl: './consrelatorio.component.html',
  styleUrls: ['./consrelatorio.component.scss']
})
export class ConsrelatorioComponent implements OnInit {

  listaRS : Relatorioseguranca[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;

  constructor(
    private rsService: RelatoriosegurancaService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      data: [null],
    });
    this.consultar();
  }

  consultar() {
    console.log('inicio');
    this.rsService.listar().subscribe(
      resposta => {
        this.listaRS = resposta as any;
      }
    );
  }

  novo() {
    this.rsService.setNovo(true);
    this.rsService.setRS(null);
    this.router.navigate(['/cadrs']);
  }

  editar(rs: Relatorioseguranca) {
    this.rsService.setNovo(false);
    this.rsService.setRS(rs);
    this.router.navigate(['/cadrs']);
  }

  itens(rs: Relatorioseguranca) {
    this.rsService.setRS(rs);
    this.router.navigate(['cadrsitem']);
  }

  imprimir(rs: Relatorioseguranca) {
    const uri =  env.baseApiUrl + 'relseguranca/rs/' + rs.idrelatorioseguranca;
    return uri;
  }

}
