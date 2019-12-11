import { Injectable } from '@angular/core';
import { Usuario } from './model/usuario';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuairo: Usuario;

  getUsuario() {
    return this.usuairo;
  }

  setUsuario(usuario: Usuario) {
    this.usuairo = usuario;
  }

  constructor( private httpClient: HttpClient ) { }

  logar(login: string, senha: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(env.baseApiUrl + 'usuarios/logar/' + login + '/' + senha);
  }

  logar1(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'usuarios/logar', usuario);
  }

  criptoSenha(senha: string): Observable<any> {
    return this.httpClient.get(env.baseApiUrl + 'usuarios/cripto/' + senha);
  }

  listar(): Observable<any> {
    return this.httpClient.get(env.baseApiUrl + 'usuarios/buscar/' + true);
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'usuarios/salvar', usuario);
  }

  update(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'usuarios/update', usuario);
  }

  buscarNome(nome: string): Observable<any> {
    return this.httpClient.get(env.baseApiUrl + 'usuarios/buscarnome/' + nome);
  }

  upload(file: File, fileName: string): Observable<any> {
    const uri = env.baseApiUrl + 'usuarios/picture';
    const formData = new FormData();
    formData.append('file', file, fileName);
    const request = new HttpRequest('POST', uri, formData);
    return this.httpClient.request(request);
  }
}

