import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setor } from './model/setor';
import { environment as env } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  private setor: Setor;

  constructor( private httpClient: HttpClient ) { }

  setSetor(setor: Setor) {
    this.setor = setor;
  }

  getSetor() {
    return this.setor;
  }

  listar(): Observable<Setor> {
    return this.httpClient.get<Setor>(env.baseApiUrl + 'setor');
  }

  salvar(setor: Setor): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'setor/salvar', setor);
  }
  
}
