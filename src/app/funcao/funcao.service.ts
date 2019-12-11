import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Funcao } from './model/funcao';
import { environment as env } from '../../environments/environment.prod';

@Injectable()
export class FuncaoService {

  private funcao: Funcao;

  constructor(private httpClient: HttpClient ) { }

  getFuncao() {
    return this.funcao;
  }

  setFuncao(fucnao: Funcao) {
    this.funcao = this.funcao;
  }

  listar(): Observable<Funcao> {
    return this.httpClient.get<Funcao>(env.baseApiUrl + 'funcao');
  }

  getNome(nome: string): Observable<Funcao> {
    return this.httpClient.get<Funcao>(env.baseApiUrl + 'funcao/nome');
  }

  getCBO(cbo: String): Observable<Funcao> {
    return this.httpClient.get<Funcao>(env.baseApiUrl + 'funcao/cbo');
  }

  salvar(funcao: Funcao): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'funcao/salvar', funcao);
  }
}
