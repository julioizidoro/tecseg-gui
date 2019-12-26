import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Salutar } from './model/salutar';
import { Loja } from '../loja/model/loja';
import { HttpClient } from '@angular/common/http';
import { Salutarfuncionario } from './model/salutarfuncionario';

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

  listarData(datainicial: Date, datafinal: Date): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/listar/' + datainicial + '/' + datafinal);
  }

  listar(): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/listar');
  }

  pesquisarLojaData(loja: Loja, datainicial: Date, datafinal: Date): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/loja/' + loja.idloja + '/' + datainicial + '/' + datafinal);
  }

  pesquisarLojaId(loja: Loja): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/loja/' + loja.idloja);
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

  listarSalutarFuncionario(salutar: Salutar): Observable<Salutarfuncionario> {
    return this.httpClient.get<Salutarfuncionario>(env.baseApiUrl + 'salutarfuncionario/listar/' + salutar.idsalutar);
  }

  salvarSalutarFuncionario(salutarFuncionario: Salutarfuncionario[]): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'salutarfuncionario/salvar', salutarFuncionario);
  }


}
