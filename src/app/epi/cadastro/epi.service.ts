import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.prod';
import { Epi } from '../model/epi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpiService {

  private epi: Epi;

  constructor(
    private httpCliente: HttpClient,
  ) { }

  getEpi() {
    return this.epi;
  }

  setEpi(epi: Epi) {
    this.epi = epi;
  }

  salvar( epi: Epi): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'epis/salvar', epi);
  }

  listar(descricao: string): Observable<Epi> {
    return this.httpCliente.get<Epi>(env.baseApiUrl + 'epis/listar/produto/descricao/' + descricao);
  }

  pesquisarId(id: number): Observable<Epi> {
    return this.httpCliente.get<Epi>(env.baseApiUrl + 'epis/id/' + id);
  }

  pesquisarProdutoId(id: number): Observable<Epi> {
    return this.httpCliente.get<Epi>(env.baseApiUrl + 'epis/produto/id/' + id);
  }

  listarEpiTipo(id: number): Observable<Epi> {
    return this.httpCliente.get<Epi>(env.baseApiUrl + 'epis/tipo/id/' + id);
  }


}
