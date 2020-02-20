import { Injectable } from '@angular/core';
import { Contas } from './model/contas';
import { environment as env } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Clientes } from '../clientes/model/clientes';



@Injectable({
  providedIn: 'root'
})
export class ContasService {
  private conta: Contas;
  private cliente: Clientes;
  private receber: boolean;

  constructor( private httpCliente: HttpClient ) {

  }

  setContas( conta: Contas) {
    this.conta = conta;
  }

  getContas() {
    return this.conta;
  }

  setICliente( cliente: Clientes) {
    this.cliente = cliente;
  }

  getCliente() {
    return this.cliente;
  }

  setReceber( receber: boolean ) {
    this.receber = receber;
  }

  getReceber() {
    return this.receber;
  }


  // Contas a recever

  listarCR(): Observable<Contas> {
    return this.httpCliente.get<Contas>(env.baseApiUrl + 'cr');
  }

  getcrId( id: number ): Observable<Contas> {
    return this.httpCliente.get<Contas>(env.baseApiUrl + 'cr/id/' + id);
  }

  salvarCR(conta: Contas): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cr/salvar', conta);
  }

  baixarCR(conta: Contas): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cr/baixar', conta);
  }

  pesquisarDocumentoCR(documento: string):  Observable<any> {
    return this.httpCliente.get<any>(env.baseApiUrl + 'cr/doc/' + documento);
  }

  // Todas com dataVencimento
  pesquisarTodasVencimentoCR(dataInicial: string, dataFinal: string, nome: string):  Observable<any> {
    console.log('parar');
    return this.httpCliente.get<any>(env.baseApiUrl + 'cr/dvtodas/' + dataInicial + '/' + dataFinal + '/' + nome );
  }

  // Recebidas com dataVencimento dvrecebidas/{datainicial}/{datafinal}/{nome}
  pesquisarRecebidasVencimentoCR(dataInicial: string, dataFinal: string, nome: string):  Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cr/dvrecebidas/', dataInicial + '/' + dataFinal + '/' + nome );
  }

  // Recebidas com dataVencimento dvrecebidas/{datainicial}/{datafinal}/{nome}
  pesquisarReceberVencimentoCR(dataInicial: string, dataFinal: string, nome: string):  Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cr/dvreceber/', dataInicial + '/' + dataFinal + '/' + nome );
  }

  // Todas contas receber DashBoard
  getTodasDashboardCR():  Observable<any> {
    return this.httpCliente.get<any>(env.baseApiUrl + 'cr/todas/');
  }
}
