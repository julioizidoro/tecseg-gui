import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Contas } from '../model/contas';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuario/model/usuario';
import { ModalDirective } from 'angular-bootstrap-md';
import { Router, ActivatedRoute } from '@angular/router';
import { ContasService } from '../contas.service';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-conscontas',
  templateUrl: './conscontas.component.html',
  styleUrls: ['./conscontas.component.scss']
})
export class ConscontasComponent implements OnInit {

  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime = true;
  contas: Contas[];
  contaSelecinada: Contas;
  inscricao: Subscription;
  pagas: boolean;
  file: File;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contasService: ContasService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.contaSelecinada = new Contas();
    this.pagas = false;
    this.formulario = this.formBuilder.group({
      documento: [null],
      cliente: [null],
      datainicial: [null],
      datafinal: [null],
      tipoConta: ['todas'],
    });
    this.consultar();
  }

  consultar() {
    this.contasService.listarCR().subscribe(
      resposta => {
        this.contas = resposta as any;
      }
    );
    this.formulario.reset();
  }

  pesquisar() {
    // tslint:disable-next-line:prefer-const
    let documento = this.formulario.get('documento').value;
    const cliente = this.formulario.get('cliente').value;
    const datainicial = this.formulario.get('datainicial').value;
    const datafinal = this.formulario.get('datafinal').value;
    const tipoConta = this.formulario.get('tipoConta').value;
    if (cliente === null) {
      const nome = '@';
    }
    if (documento != null) {
      this.pesquisarDocumento(documento);
    } else if ((datainicial != null) && (datafinal != null)) {
      this.pesquisarDataVencimento(tipoConta, datainicial, datafinal, cliente);
    }
  }

  pesquisarDocumento(ducumento: string) {
    this.contasService.pesquisarDocumentoCR(ducumento).subscribe(
      resposta => {
        this.contas = resposta as any;
      }
    );
  }

  pesquisarNome(cliente: string) {
    this.contasService.listarCR().subscribe(
      resposta => {
        this.contas = resposta as any;
      }
    );
  }

  pesquisarDataVencimento(tipoConta: string, dataInicial: string, dataFinal: string, cliente: string) {
    if (tipoConta === 'todas') {
      this.contasService.pesquisarTodasVencimentoCR(dataInicial, dataFinal, cliente).subscribe(
        resposta => {
          this.contas = resposta as any;
        }
      );
    } else if (tipoConta === 'pagas') {
      this.contasService.pesquisarRecebidasVencimentoCR(dataInicial, dataFinal, cliente).subscribe(
        resposta => {
          this.contas = resposta as any;
        }
      );
    } else if (tipoConta === 'pagar') {
      this.contasService.pesquisarReceberVencimentoCR(dataInicial, dataFinal, cliente).subscribe(
        resposta => {
          this.contas = resposta as any;
        }
      );
    }
  }
  editar(conta: Contas) {
    this.contasService.setReceber(false);
    this.contasService.setContas(conta);
    this.router.navigate(['/cadreceber']);
  }

  adicionar() {
    this.contasService.setContas(null);
    this.contasService.setReceber(false);
    this.router.navigate(['/cadreceber']);
  }

  baixar(conta: Contas) {
    this.contasService.setContas(conta);
    this.contasService.setReceber(true);
    this.router.navigate(['/cadreceber']);
  }

  

  
}