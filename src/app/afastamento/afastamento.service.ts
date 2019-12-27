import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment.prod';
import { Codigoafastamento } from './model/codigoafastamento';
import { Observable } from 'rxjs';
import { Historicosituacao } from './model/historicosituacao';

@Injectable({
  providedIn: 'root'
})
export class AfastamentoService {

  private codigoAfastamento : Codigoafastamento;

  constructor( private httpClient: HttpClient ) { }

  getCodigoAfastamento() {
    return this.codigoAfastamento;
  }

  setCodigoAfastamento(codigoAfastamento : Codigoafastamento) {
    this.codigoAfastamento = codigoAfastamento;
  }

  listar(): Observable<Codigoafastamento> {
    return this.httpClient.get<Codigoafastamento>(env.baseApiUrl + 'codafastamentoasotipo');
  }

  getId(id: number): Observable<Codigoafastamento> {
    return this.httpClient.get<Codigoafastamento>(env.baseApiUrl + 'codafastamentoasotipo/id/' + id);
  }

  salvar(historico: Historicosituacao): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'historicosituacao/salvar', historico);
  }

  
}
