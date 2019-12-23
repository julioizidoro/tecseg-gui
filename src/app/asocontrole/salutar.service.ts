import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Salutar } from './model/salutar';
import { Loja } from '../loja/model/loja';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalutarService {

  constructor(
    private httpClient: HttpClient
  ) { }

  listar(): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/listar');
  }

  pesquisarLoja(loja: Loja): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/loja/' + loja.idloja);
  }

  pesquisarId(id: number): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/' + id);
  }

  pesquisarNome(nome: string): Observable<Salutar> {
    return this.httpClient.get<Salutar>(env.baseApiUrl + 'salutar/' + nome);
  }
}
