import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.prod';
import { Epitipo } from './model/epitipo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpitipoService {

  private epiTipo: Epitipo;

  constructor(
    private httpCliente: HttpClient,
  ) { }

  getEpiTipo() {
    return this.epiTipo;
  }

  setEpiTipo(epiTipo: Epitipo) {
    this.epiTipo = epiTipo;
  }

  salvar( epi: Epitipo): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'epitipo/salvar', epi);
  }

  listar(descricao: string): Observable<Epitipo> {
    return this.httpCliente.get<Epitipo>(env.baseApiUrl + 'epitipo/listar/' + descricao);
  }

  pesquisarId(id: number): Observable<Epitipo> {
    return this.httpCliente.get<Epitipo>(env.baseApiUrl + 'epitipo/id/' + id);
  }

}
