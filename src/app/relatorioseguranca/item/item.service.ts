import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment.prod';
import { Relatorioseguranca } from '../model/relatorioseguranca';
import { Relatoriosegurancaitens } from '../model/relatoriosegurancaitens';



@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private httpClient: HttpClient
  ) { }

  listar(): Observable<Relatoriosegurancaitens> {
    return this.httpClient.get<Relatoriosegurancaitens>(env.baseApiUrl + 'relseguranca/listar/' );
  }

  salvar(rs: Relatorioseguranca): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'relSeguranca/salvar', rs);
  }
}
