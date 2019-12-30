import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { Asoagenda } from '../model/asoagenda';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { Router } from '@angular/router';
import { AsotipoService } from 'src/app/asocontrole/asotipo.service';
import { LojaService } from 'src/app/loja/loja.service';
import { AsoagendaService } from '../asoagenda.service';

import { environment as env } from '../../../environments/environment.prod';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-consasoagenda',
  templateUrl: './consasoagenda.component.html',
  styleUrls: ['./consasoagenda.component.scss']
})
export class ConsasoagendaComponent implements OnInit {

  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;
  lojas: Loja[];
  lojaSelecionada: Loja;
  asoAgendas: Asoagenda[];

  constructor(
    private formBuilder: FormBuilder,
    private funcaoService: FuncaoService,
    private router: Router,
    private asotipoService: AsotipoService,
    private lojaService: LojaService,
    private asoagendaService: AsoagendaService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      situacao: [null],
    });
    this.carregarComboBox();
    this.formulario.reset();
    this.consultar();
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

  consultar() {
    this.asoagendaService.listar().subscribe(
      resposta => {
        this.asoAgendas = resposta as any;
      }
    );
  }

  pesquisarLimpar() {
    this.formulario.reset();
    this.lojaSelecionada = null;
    this.consultar();
  }

  pesquisar() {
    let nomePesquisa = this.formulario.get('nome').value;
    const situacao = this.formulario.get('situacao').value;
    if (nomePesquisa == null) {
      nomePesquisa = '@';
    }
    if ((this.lojaSelecionada != null) && (situacao != null)) {
      this.pesquisarAll( this.lojaSelecionada.idloja, nomePesquisa, situacao);
    } else if (this.lojaSelecionada != null) {
      this.pesquisarLoja(this.lojaSelecionada.idloja, nomePesquisa);
    } else if (situacao != null) {
      this.pesquisarSituacao(situacao, nomePesquisa);
    } else {
      this.pesquisarNome(nomePesquisa);
    }
  }

pesquisarNome( nomePesquisa: string ) {
  this.asoagendaService.pesquisarNome( nomePesquisa ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
      console.log(this.asoAgendas);
    }
  );
}

pesquisarLoja( idLoja: number, nomePesquisa: string) {
  this.asoagendaService.pesquisarLoja( idLoja, nomePesquisa ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

pesquisarSituacao( situacao: string, nomePesquisa: string) {
  this.asoagendaService.pesquisarSituacao( situacao, nomePesquisa ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

pesquisarAll( idLoja: number, nomePesquisa: string, situacao: string) {
  this.asoagendaService.pesquisar( idLoja, nomePesquisa, situacao ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

novo() {
  this.asoagendaService.setAsoAgenda(null);
  this.router.navigate([ '/cadasoagenda']);
}

editar(asoAgenda: Asoagenda) {
  this.asoagendaService.setAsoAgenda(asoAgenda);
  this.router.navigate([ '/cadasoagenda']);
}

imprimir(asoAgenda: Asoagenda) {
  let uri =  env.baseApiUrl + 'asoagenda/autorizacao/' + asoAgenda.idasoagenda; 
  return uri;
}

cancelar(asoAgenda: Asoagenda) {
  asoAgenda.usuario = this.authService.getUsuario();
  asoAgenda.datacancelamento = new Date;
  asoAgenda.situacao= 'Cancelado';
  this.asoagendaService.salvar(asoAgenda).subscribe(resposta => {
    asoAgenda = resposta as Asoagenda;
  });
}

finalizar(asoAgenda: Asoagenda) {
  asoAgenda.usuario = this.authService.getUsuario();
  asoAgenda.situacao= 'Finalizado';
  this.asoagendaService.salvar(asoAgenda).subscribe(resposta => {
    asoAgenda = resposta as Asoagenda;
    this.consultar();
  });
}

}