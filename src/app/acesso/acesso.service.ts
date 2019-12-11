import { Injectable } from '@angular/core';
import { Acesso } from './model/acesso';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  private acesso: Acesso;

  getAcesso() {
    return this.acesso;
  }

  setAcesso(acesso: Acesso) {
    this.acesso = acesso;
  }

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Acesso> {
    return this.httpClient.get<Acesso>(env.baseApiUrl + 'acessos/listar');
  }

  salvar(acesso: Acesso): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'acessos/salvar', acesso);
  }



}
