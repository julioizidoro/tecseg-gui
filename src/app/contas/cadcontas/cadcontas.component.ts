import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Contas } from '../model/contas';
import { Clientes } from 'src/app/clientes/model/clientes';
import { Subscription } from 'rxjs';
import { ContasService } from '../contas.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { ClientesService } from 'src/app/clientes/clientes.service';

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
    private clienteService: ClientesService,
  ) {
    this.conta = this.contasService.getContas();
  }

  ngOnInit() {
    this.receber = this.contasService.getReceber();
    this.clienteSelecionado = this.clienteService.getCliente();
    console.log('parar');
    if (this.clienteSelecionado == null) {
      this.clienteSelecionado = new Clientes();  
      this.clienteSelecionado.nome = '';
      this.nomeCliente = 'Nome do cliente'
    } else {
      this.nomeCliente = this.clienteSelecionado.nome;
      this.clienteService.setCliente(null);
    }
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
    }
  }

  consultaCliente() {
    this.clienteService.setRota('contasr');
    this.router.navigate(['/consclientes']);
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
        this.router.navigate(['/consreceber']);
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  cancelar() {
    this.formulario.reset();
    this.contasService.setContas(null);
    this.contasService.setICliente(null);
    this.router.navigate(['/consreceber']);
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
