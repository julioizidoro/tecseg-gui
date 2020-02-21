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

  private historico: Historicosituacao;

  constructor( private httpClient: HttpClient ) { }

  setHistorico(historico: Historicosituacao) {
    this.historico = historico;
  }

  getHistorico() {
    return this.historico;
  }

  //Codigo Afastamento
  
  listar(descricao: string): Observable<Codigoafastamento> {
    return this.httpClient.get<Codigoafastamento>(env.baseApiUrl + 'codafastamento/' + descricao);
  }

  getId(id: number): Observable<Codigoafastamento> {
    return this.httpClient.get<Codigoafastamento>(env.baseApiUrl + 'codafastamento/id/' + id);
  }

  salvar(historico: Historicosituacao): Observable<any> {
    console.log('aqui');
    return this.httpClient.post<any>(env.baseApiUrl + 'historicosituacao/salvar', historico);
  }

  listarHistorico(): Observable<Historicosituacao> {
    return this.httpClient.get<Historicosituacao>(env.baseApiUrl + 'historicosituacao/listar');
  }

  
}
