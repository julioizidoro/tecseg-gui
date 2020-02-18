import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Contas } from '../model/contas';
import { Clientes } from 'src/app/clientes/model/clientes';
import { Subscription } from 'rxjs';
import { ContasService } from '../contas.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-cadcontas',
  templateUrl: './cadcontas.component.html',
  styleUrls: ['./cadcontas.component.scss']
})
export class CadcontasComponent implements OnInit {

  formulario: FormGroup;
  conta: Contas;
  clienteSelecionado: Clientes;
  nomeCliente: string;
  inscricao: Subscription;
  tipo: string;
  habilitar: string;
  receber: boolean;

  constructor(
    private contasService: ContasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.conta = this.contasService.getContas();
  }

  ngOnInit() {
    this.receber = this.contasService.getReceber();
    this.clienteSelecionado = new Clientes();
    this.clienteSelecionado.nome = '';
    this.nomeCliente = '';
    this.setFormulario();
    if (this.conta != null) {
      this.clienteSelecionado = this.conta.clientes;
      this.formulario = this.formBuilder.group({
        idcontas: this.conta.idcontas,
        documento: this.conta.documento,
        dataemissao: this.conta.datacompra,
        datavencimento: this.conta.datavencimento,
        datapagamento: this.conta.datapagamento,
        valorparcela: this.conta.valorcompra,    
        valorpago: this.conta.valorpago,
        formapagamento: this.conta.formapagamento,
        observacao: this.conta.observacao,
        tipo: this.conta.tipo,
        clientes: this.conta.clientes,
      });
    } else {
      this.conta = new Contas();
      this.clienteSelecionado = this.contasService.getCliente();
      if (this.clienteSelecionado != null) {
        this.nomeCliente = this.clienteSelecionado.nome;
      }
    }
  }

  consultaCliente() {
    this.router.navigate(['/consCliente', 'contasr']);
  }

  salvar() {
    if (this.receber) {
      this.baixar();
    } else {
      this.incluir();
    }
  }

  incluir() {
    this.conta = this.formulario.value;
    this.conta.clientes = this.clienteSelecionado;
    this.conta.valorpago = 0;
    this.conta.tipo = 'r';
    this.contasService.salvarCR(this.conta).subscribe(
      resposta => {
        this.conta = resposta as any;
        this.contasService.setContas(null);
        this.contasService.setICliente(null);
        this.router.navigate(['/consconta']);
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  cancelar() {
    this.formulario.reset();
    this.router.navigate(['/conconta']);
  }

  setFormulario() {
    this.formulario = this.formBuilder.group({
      idcontas: [null],
      documento: [null],
      datacompra: new Date(),
      datavencimento: [null],
      datapagamento: [null],
      valorcompra: [null],
      valorpago: 0,
      formapagamento: [null],
      observacao: [null],
      tipo: [null],
      clientes: [null],
    });
  }

  
  baixar() {
    this.conta = this.formulario.value;
    this.conta.clientes = this.clienteSelecionado;
    this.contasService.baixarCR(this.conta).subscribe(
      resposta => {
        this.conta = resposta as any;
        this.contasService.setContas(null);
        this.contasService.setICliente(null);
        this.router.navigate(['/consconta']);
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

}
