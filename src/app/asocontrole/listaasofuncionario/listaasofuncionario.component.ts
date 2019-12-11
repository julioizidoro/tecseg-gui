import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Asocontrole } from '../model/asocontrole';
import { ActivatedRoute } from '@angular/router';
import { AsocontroleService } from '../asocontrole.service';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Loja } from 'src/app/loja/model/loja';

@Component({
  selector: 'app-listaasofuncionario',
  templateUrl: './listaasofuncionario.component.html',
  styleUrls: ['./listaasofuncionario.component.scss']
})
export class ListaasofuncionarioComponent implements OnInit {

  funcionarioSelecionado: Funcionario;
  listaAso: Asocontrole[];

  constructor(
    private activeRrouter: ActivatedRoute,
    private asoControleService: AsocontroleService,
  ) { }

  ngOnInit() {
    let aso = this.asoControleService.getAso();
    this.funcionarioSelecionado = aso.funcionario;
    this.asoControleService.getFuncionarioId(this.funcionarioSelecionado.idfuncionario).subscribe(
      resposta => {
        this.listaAso = resposta as any;
        this.funcionarioSelecionado = this.listaAso[0].funcionario;
      },
        err => {
          console.log(err.error.erros.join(' '));
      }
    );
  }

  getSituacao(situacao: boolean) {
    if (situacao){
      return 'Finalizado';
    }else {
      return 'Ativo';
    }
  }

}
