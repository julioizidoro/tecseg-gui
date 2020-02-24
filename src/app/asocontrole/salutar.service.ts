import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Salutar } from './model/salutar';
import { Loja } from '../loja/model/loja';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Salutarfuncionario } from './model/salutarfuncionario';
import { PagSalutar } from './model/PagSalutar';

@Injectable({
  providedIn: 'root'
})
export class SalutarService {

  private salutar: Salutar;

  constructor(
    private httpClient: HttpClient
  ) { }

  getSalutar() {
    return this.salutar;
  }

  setSalutar( salutar: Salutar) {
    this.salutar = salutar;
  }

  listarData(datainicial: string, datafinal: string): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/listar/' + datainicial + '/' + datafinal);
  }

  listar(): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/listar');
  }

  pesquisarLojaData(loja: Loja, datainicial: Date, datafinal: Date): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/listar/' + loja.idloja + '/' + datainicial + '/' + datafinal);
  }

  pesquisarLojaId(loja: Loja): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/listar/' + loja.idloja);
  }

  pesquisarId(id: number): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/' + id);
  }

  pesquisarNome(nome: string): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/' + nome);
  }

  salvar(salutar: Salutar): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'salutar/salvar', salutar);
  }

  deletar(salutar: Salutar): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: salutar,
    };
    return this.httpClient.delete<any>(env.baseApiUrl + 'salutar/deletar', options);
  }

  listarSalutarFuncionario(salutar: Salutar): Observable<Salutarfuncionario> {
    return this.httpClient.get<Salutarfuncionario>(env.baseApiUrl + 'salutarfuncionario/listar/' + salutar.idsalutar);
  }

  salvarSalutarFuncionario(salutarFuncionario: Salutarfuncionario[]): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'salutarfuncionario/salvar', salutarFuncionario);
  }

 

}
