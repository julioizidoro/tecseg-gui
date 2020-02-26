import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Relatorioseguranca } from './model/relatorioseguranca';
import { Relatoriosegurancaitens } from './model/relatoriosegurancaitens';



@Injectable({
  providedIn: 'root'
})
export class RelatoriosegurancaService {

  private rs: Relatorioseguranca;
  private rsItem: Relatoriosegurancaitens;


  constructor(
    private httpClient: HttpClient
  ) { }

  setRS(rs: Relatorioseguranca) {
    this.rs = rs;
  }

  getRSItem(){
    return this.rsItem;
  }

  setRSItem(rsItem: Relatoriosegurancaitens) {
    this.rsItem = rsItem;
  }

  getRS(){
    return this.rs;
  }

//Relatorio
  listar(): Observable<Relatorioseguranca> {
    return this.httpClient.get<Relatorioseguranca>(env.baseApiUrl + 'relseguranca/listar');
  }

  salvar(rs: Relatorioseguranca): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'relSeguranca/salvar', rs);
  }

  //Itens

  listarItens(id: number): Observable<Relatoriosegurancaitens> {
    return this.httpClient.get<Relatoriosegurancaitens>(env.baseApiUrl + 'rsitens/listar/' + id);
  }

  salvarItens(rsitem: Relatoriosegurancaitens): Observable<any> {
    console.log('aqui');
    rsitem.relatorioseguranca = this.rs;
    return this.httpClient.post<any>(env.baseApiUrl + 'rsitens/salvar', rsitem);
  }

}
