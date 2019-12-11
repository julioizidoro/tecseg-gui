import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loja } from './model/loja';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';

@Injectable()
export class LojaService {

  constructor(private httpClient: HttpClient ) { }

  listar(): Observable<Loja> {
    return this.httpClient.get<Loja>(env.baseApiUrl + 'lojas');

  }
}
