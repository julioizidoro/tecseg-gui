import { Injectable } from '@angular/core';
import { Clientes } from './model/clientes';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private cliente: Clientes;

  constructor(
    private httpClient: HttpClient,
  ) { }

  setCliente(cliente: Clientes) {
    this.cliente = cliente;
  }

  getCliente() {
    return this.cliente;
  }

  pesquisar(nome: string, email: string, tipo: string): Observable<Clientes> {
    return this.httpClient.get<Clientes>(env.baseApiUrl + 'clientes/listar/' + nome + '/' + email + '/' + tipo);
  }

  listar(tipo: string): Observable<Clientes> {
    return this.httpClient.get<Clientes>(env.baseApiUrl + 'clientes/listar/tipo/' +tipo);
  }

  salvar(cliente: Clientes): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'clientes/salvar', cliente);
  }

  getId(id: number): Observable<Clientes> {
    return this.httpClient.get<Clientes>(env.baseApiUrl + 'clientes/' +  id);
  }

  getAniversariantes(): Observable<Clientes> {
    return this.httpClient.get<Clientes>(env.baseApiUrl + 'clientes/aniversario');
  }

}
