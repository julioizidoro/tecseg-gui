import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Produtogrupo } from './model/produtogrupo';

@Injectable({
  providedIn: 'root'
})
export class ProdutogrupoService {

  constructor( private httpClient: HttpClient ) { }

  listar(): Observable<Produtogrupo> {
    return this.httpClient.get<Produtogrupo>(env.baseApiUrl + 'produtogrupo/listar');
  }
}
