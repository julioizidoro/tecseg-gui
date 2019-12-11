import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Treinamento } from './model/treinamento';
import { environment as env } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TreinamentoService {

  constructor( private httpClient: HttpClient ) { }

  listar(): Observable<Treinamento> {
    return this.httpClient.get<Treinamento>(env.baseApiUrl + 'treinamentos');
  }

  salvar(treinamento: Treinamento): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'treinamentos/salvar', treinamento);
  }

}