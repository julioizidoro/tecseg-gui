import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment.prod';
import { Asoagenda } from './model/asoagenda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsoagendaService {

  private asoAgenda : Asoagenda;

  constructor(private httpClient: HttpClient ) { }

  setAsoAgenda(asoAgenda: Asoagenda) {
    this.asoAgenda = asoAgenda;
  }

  getAsoAgenda() {
    return this.asoAgenda;
  }

  listar(): Observable<Asoagenda> {
    return this.httpClient.get<Asoagenda>(env.baseApiUrl + 'asoagenda');
  }

  pesquisarLoja(idloja: number, nome: string): Observable<Asoagenda> {
    return this.httpClient.get<Asoagenda>(env.baseApiUrl + 'asoagenda/loja/' + idloja + '/' + nome);
  }

  pesquisarSituacao(situacao: string, nome: string): Observable<Asoagenda> {
    return this.httpClient.get<Asoagenda>(env.baseApiUrl + 'asoagenda/situacao/' + situacao + '/' + nome);
  }

  pesquisarNome(nome: string): Observable<Asoagenda> {
    return this.httpClient.get<Asoagenda>(env.baseApiUrl + 'asoagenda/nome/' +  nome);
  }
  pesquisar(idloja: number, nome: string, situacao: string): Observable<Asoagenda> {
    return this.httpClient.get<Asoagenda>(env.baseApiUrl + 'asoagenda/' + idloja + '/' + nome + '/' + situacao);
  }

  salvar(asoAgenda: Asoagenda): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'asoagenda/salvar', asoAgenda);
  }

  getId(id: number): Observable<Asoagenda> {
    return this.httpClient.get<Asoagenda>(env.baseApiUrl + 'asoagenda/id/' +  id);
  }

  


}

