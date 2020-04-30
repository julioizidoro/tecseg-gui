import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Treinamentotipo } from '../model/treinamentotipo';
import { Router } from '@angular/router';
import { TreinamentoService } from '../treinamento.service';
import { Treinamento } from '../model/treinamento';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-cadtreinamento',
  templateUrl: './cadtreinamento.component.html',
  styleUrls: ['./cadtreinamento.component.scss']
})
export class CadtreinamentoComponent implements OnInit {
  formulario: FormGroup;
  treinamentostipo: Treinamentotipo[];
  treinamentotipoSelecionado: Treinamentotipo;
  treinamento: Treinamento;
  public maskHora = [/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private treinamentoService: TreinamentoService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.treinamento = this.treinamentoService.getTreinamento();
    if (this.treinamento != null) {
      this.treinamentotipoSelecionado = this.treinamento.treinamentotipo;
      this.formulario = this.formBuilder.group({
        idtreinamento: this.treinamento.idtreinamento,
        data: this.treinamento.data,
        hora: this.treinamento.hora,
        duracao: this.treinamento.duracao,
        instrutor: this.treinamento.instrutor,
        conteudo: this.treinamento.conteudo,
        local: this.treinamento.local,
        cidade: this.treinamento.cidade,
        situacao: this.treinamento.situacao,
        datavencimento: this.treinamento.datavencimento,
        complementotitulo: this.treinamento.complementotitulo,
        assinstrutor: this.treinamento.assinstrutor,
        treinamentotipo: this.treinamento.treinamentotipo,
        usuario: this.treinamento.usuario,
      });
    } else {
      this.formulario = this.formBuilder.group({
        idtreinamento: [null],
        data: [null],
        hora: [null],
        duracao: [null],
        instrutor: [null],
        conteudo: [null],
        local: [null],
        cidade: [null],
        situacao: [null],
        datavencimento: [null],
        complementotitulo: [null],
        assinstrutor: [false],
        treinamentotipo: [null],
        usuario: [null],
      });
    }
    this.carregarComboBox();
  }

  carregarComboBox() {
    this.treinamentoService.listarTipo().subscribe(resposta => {
      this.treinamentostipo = resposta as any;
    });
  }

  setTreinamentoTipo() {
    this.treinamentotipoSelecionado = this.formulario.get('treinamentotipo').value;
    if ( this.treinamentotipoSelecionado != null ) {
      this.formulario.get('conteudo').setValue(this.treinamentotipoSelecionado.conteudo);
      this.formulario.get('complementotitulo').setValue(this.treinamento.complementotitulo);
    }
  }

  compararTreinamentoTipo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  salvar() {
    this.treinamento = this.formulario.value;
    this.treinamento.usuario = this.authService.getUsuario();
    this.treinamento.situacao = 'Agendado';
    this.treinamentoService.salvar(this.treinamento).subscribe(resposta => {
      this.treinamento = resposta as any;
      this.formulario.reset();
      this.treinamentoService.setTreinamento(null);
      this.router.navigate([ '/constreinamento']);
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );
  }

  cancelar() {
    this.formulario.reset();
    this.treinamentoService.setTreinamento(null);
    this.router.navigate([ '/constreinamento']);
  }

}
