import { Injectable } from '@angular/core';
import { Funcionario } from './model/funcionario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment.prod';
import { Contratoexp } from './model/Contratoexp';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private funcionario: Funcionario;
  private rota: string;

  constructor( private httpClient: HttpClient ) { }

  getFuncionario() {
    return this.funcionario;
  }

  setFuncionario(funcionario: Funcionario) {
    this.funcionario = funcionario;
  }

  getRota() {
    return this.rota;
  }

  setRota(rota: string) {
    this.rota = rota;
  }

  listar(nome: string, sit: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/' + nome + '/' + sit);
  }

  salvar(funcionario: Funcionario): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'funcionarios/salvar', funcionario);
  }

  atualizar(funcionario: Funcionario): Observable<any> {
    return this.httpClient.put<any>(env.baseApiUrl + 'funcionarios/atualizar', funcionario);
  }

  getFuncionarioId(id: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/id/' +  id);
  }

  getFuncionarioCPF(cpf: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/cpf/' +  cpf);
  }

  getFuncionarioFuncao(id: number, nome: string, situacao: string, sexo: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/funcao/' +  id + '/' + nome + '/' + situacao + '/' + sexo);
  }

  getFuncionarioLoja(id: number, nome: string, situacao: string, sexo: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/loja/' +  id + '/' + nome + '/' + situacao + '/' + sexo);
  }

  getFuncionarioFuncaoLoja(idloja: number, idfuncao: number, nome: string, situacao: string, sexo: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/' + idloja + '/' + idfuncao + '/' + nome + '/' + situacao + '/' + sexo);
  }

  exportarSalutar(): Observable<any> {
    return this.httpClient.get<any>(env.baseApiUrl + 'funcionarios/salutar' );
  }

  getLoja(id: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/lojasalutar/' +  id);
  }

  getLojaData(id: number, datainicial: Date, datafinal: Date): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/lojasalutar/' +  id + '/' + datainicial + '/' + datafinal);
  }

  getAniversariantes(): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/aniversariantes');
  }

  findcontrato(): Observable<Contratoexp> {
    return this.httpClient.get<Contratoexp>(env.baseApiUrl + 'funcionarios/contratos');
  }

}

