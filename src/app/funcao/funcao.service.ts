import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Funcao } from './model/funcao';
import { environment as env } from '../../environments/environment.prod';

@Injectable()
export class FuncaoService {

  constructor(private httpClient: HttpClient ) { }

  listar(): Observable<Funcao> {
    return this.httpClient.get<Funcao>(env.baseApiUrl + 'funcao');

  }
}
