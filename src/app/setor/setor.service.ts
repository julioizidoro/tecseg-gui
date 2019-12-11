import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setor } from './model/setor';
import { environment as env } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor( private httpClient: HttpClient ) { }

  listar(): Observable<Setor> {
    return this.httpClient.get<Setor>(env.baseApiUrl + 'setor');

  }
}
