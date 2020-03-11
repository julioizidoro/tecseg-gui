import { Component, OnInit } from '@angular/core';
import { Asoagenda } from '../model/asoagenda';
import { Autorizacaoexame } from '../model/autorizacaoexame';
import { Agendaexame } from '../model/agendaexame';
import { Router } from '@angular/router';
import { AsoagendaService } from '../asoagenda.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment as env } from '../../../environments/environment.prod';

@Component({
  selector: 'app-autorizacaolaboratorio',
  templateUrl: './autorizacaolaboratorio.component.html',
  styleUrls: ['./autorizacaolaboratorio.component.scss']
})
export class AutorizacaolaboratorioComponent implements OnInit {

  asoAgenda: Asoagenda;
  agendaExames: Agendaexame[];
  listaAutorizacao: Autorizacaoexame[];
  formulario: FormGroup;
  

  constructor(
    private router: Router,
    private asoagendaService: AsoagendaService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      situacao: [null],
    });
    this.asoAgenda = this.asoagendaService.getAsoAgenda();
    this.agendaExames = [];
    if (this.asoAgenda != null) {
      this.asoagendaService.listarAgendaExame(this.asoAgenda).subscribe(
        resposta => {
          this.agendaExames = resposta as any;
          if (this.agendaExames != null) {
            this.listaAutorizacao = [];
            for ( let exame of this.agendaExames ) {
              let autorizacao = new Autorizacaoexame();
              autorizacao.selecionado = false;
              autorizacao.agendaexame  =exame;
              autorizacao.botao = "fas fa-plus-circle";
              this.listaAutorizacao.push(autorizacao);
            }
          } 
        }
      );
    }

  }

 

  imprimir() {
    let ex ='';
    for (let auto of this.listaAutorizacao){
      if (auto.selecionado) {
        ex = ex + '( X ) ' + auto.agendaexame.asotipo.nome + '     ';
      }
    }
    const uri = env.baseApiUrl + 'agendaexame/autorizacaounidos/' + this.asoAgenda.idasoagenda + '/' + ex;
    return uri;
  }

  cancelar() {
    this.asoagendaService.setAsoAgenda(null);
    this.router.navigate(['/consasoagenda']);
  }

  adicionarImpressao(id: number) {
    if (this.listaAutorizacao[id].selecionado) {
      this.listaAutorizacao[id].selecionado = false;
      this.listaAutorizacao[id].botao = "fas fa-plus-circle";
    } else {
      this.listaAutorizacao[id].selecionado = true;
      this.listaAutorizacao[id].botao = "far fa-trash-alt";
    }
  }

 

}
