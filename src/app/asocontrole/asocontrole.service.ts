import { Injectable } from '@angular/core';
import { Asocontrole } from './model/asocontrole';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsocontroleService {

  constructor( private httpClient: HttpClient ) { }

  listar(): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole');
  }

  salvar(asoControle: Asocontrole): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'asocontrole/salvar', asoControle);
  }

  atualizar(asoControle: Asocontrole): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'asocontrole/atualizar', asoControle);
  }

  calcularVencimento(dataVencimento: Date, dias: number): Observable<any> {
    return this.httpClient.get<any>(env.baseApiUrl + 'asocontrole/calculardata/' + dataVencimento + '/' + dias);
  }

  getDataVencimento(dataI: Date, dataF: Date, nome: string): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/datavencimento/' +  dataI + '/' + dataF + '/' + nome);
  }

  getDataVencimentoFuncao(dataI: Date, dataF: Date, nome: string, idfuncao: number): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl +
      'asocontrole/datavencimento/' +  dataI + '/' + dataF + '/' + nome + '/' + idfuncao);
  }

  getDataVencimentoLoja(dataI: Date, dataF: Date, nome: string, idloja: number): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/datavencimento/' +
    dataI + '/' + dataF + '/' + nome + '/' + idloja);
  }

  getDataVencimentoTipo(dataI: Date, dataF: Date, nome: string, idtipo: number): Observable<Asocontrole> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/datavencimento/' +  dataI + '/' + dataF + '/' + nome + '/' + idtipo);
  }

  getFuncaoTipo(nome: string, idfuncao: number, idtipo: number): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/funcaotipo/' +  idfuncao + '/' + idtipo + '/' + nome);
  }

  getFuncaoLoja(nome: string, idfuncao: number, idloja: number): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/funcaoloja/' +  idfuncao + '/' + idloja + '/' + nome);
  }

  getLojaTipo(nome: string, idtipo: number, idloja: number): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/lojatipo/' +  idloja + '/' + idtipo + '/' + nome);
  }

  getLoja(nome: string, idloja: number): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/loja/'  + idloja + '/' + nome);
  }

  getFuncao(nome: string, idfuncao: number): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/funcao/'  + idfuncao + '/' + nome);
  }

  getTipo(nome: string, idtipo: number): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/tipo/'  + idtipo + '/' + nome);
  }

  getNome(nome: string): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/nome/' + nome);
  }

  getAsoControle(dataI: Date, dataF: Date, nome: string, idloja: number, idfuncao: number, idtipo: number ): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/datavencimento/' +
    dataI + '/' + dataF + '/' + nome + '/' + idloja + '/' + idfuncao + '/' + idtipo );
  }

  getLast(idfuncionario: number) {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/last/' + idfuncionario);
  }

  getFuncionarioId(idfuncionario: number) {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/funcionario/' + idfuncionario);
  }

  getId(id: number) {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole/id/' + id);
  }


}
