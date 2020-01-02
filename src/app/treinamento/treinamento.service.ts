import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Treinamento } from './model/treinamento';
import { environment as env } from '../../environments/environment.prod';
import { Treinamentotipo } from './model/treinamentotipo';

@Injectable({
  providedIn: 'root'
})
export class TreinamentoService {

  private treinamento: Treinamento;
  private treinamentoTipo: Treinamentotipo;

  constructor( private httpClient: HttpClient ) { }

setTreinamento(treinamento: Treinamento) {
  this.treinamento = treinamento;
}

getTreinamento() {
  return this.treinamento;
}

setTreinamentoTipo(treinamentoTipo: Treinamentotipo) {
  this.treinamentoTipo = treinamentoTipo;
}

getTreinamentoTipo() {
  return this.treinamentoTipo;
}


  /* Treinamentos */

  listar(): Observable<Treinamento> {
    return this.httpClient.get<Treinamento>(env.baseApiUrl + 'treinamentos');
  }

  salvar(treinamento: Treinamento): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'treinamentos/salvar', treinamento);
  }



  /* Teeinamento Tipo */

  listarTipo(): Observable<Treinamentotipo> {
    return this.httpClient.get<Treinamentotipo>(env.baseApiUrl + 'treinamentotipo/listar');
  }

  listarTipoNome(nome: string): Observable<Treinamentotipo> {
    return this.httpClient.get<Treinamentotipo>(env.baseApiUrl + 'treinamentotipo/listar/nome/' + nome);
  }

  listarTipoTipo(tipo: string): Observable<Treinamentotipo> {
    return this.httpClient.get<Treinamentotipo>(env.baseApiUrl + 'treinamentotipo/listar/tipo/' + tipo);
  }

  salvarTipo(treinamento: Treinamentotipo): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'treinamentotipo/salvar', treinamento);
  }

}