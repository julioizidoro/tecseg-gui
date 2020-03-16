import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Treinamento } from './model/treinamento';
import { environment as env } from '../../environments/environment.prod';
import { Treinamentotipo } from './model/treinamentotipo';
import { Treinamentoparticipante } from './model/treinamentoparticipante';

@Injectable({
  providedIn: 'root'
})
export class TreinamentoService {

  private treinamento: Treinamento;
  private treinamentoTipo: Treinamentotipo;

  constructor( private httpClient: HttpClient ) { }

setTreinamento(treinamento: Treinamento) {
  this.treinamento = treinamento;
}

getTreinamento() {
  return this.treinamento;
}

setTreinamentoTipo(treinamentoTipo: Treinamentotipo) {
  this.treinamentoTipo = treinamentoTipo;
}

getTreinamentoTipo() {
  return this.treinamentoTipo;
}


  /* Treinamentos */

  listar(): Observable<Treinamento> {
    return this.httpClient.get<Treinamento>(env.baseApiUrl + 'treinamentos');
  }

  listar7Dias(): Observable<Treinamento> {
    return this.httpClient.get<Treinamento>(env.baseApiUrl + 'treinamentos/dias/7');
  }

  salvar(treinamento: Treinamento): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'treinamentos/salvar', treinamento);
  }

  //Pesquisar todos
  pesquisarTodos(datainicial: Date, datafinal: Date, situacao: string): Observable<Treinamento> {
    return this.httpClient.get<Treinamento>(env.baseApiUrl + 'treinamentos/' + datainicial + '/' + datafinal + '/' + situacao);
  }

  //Pesquisar data
  pesquisarData(datainicial: Date, datafinal: Date): Observable<Treinamento> {
    return this.httpClient.get<Treinamento>(env.baseApiUrl + 'treinamentos/' + datainicial + '/' + datafinal);
  }

  //Pesquisar situacao
  pesquisarSituacao(situacao: string): Observable<Treinamento> {
    return this.httpClient.get<Treinamento>(env.baseApiUrl + 'treinamentos/situacao/' + situacao);
  }


  /* Teeinamento Tipo */

  listarTipo(): Observable<Treinamentotipo> {
    return this.httpClient.get<Treinamentotipo>(env.baseApiUrl + 'treinamentotipo/listar');
  }

  listarTipoNome(nome: string): Observable<Treinamentotipo> {
    return this.httpClient.get<Treinamentotipo>(env.baseApiUrl + 'treinamentotipo/listar/nome/' + nome);
  }

  listarTipoTipo(tipo: string): Observable<Treinamentotipo> {
    return this.httpClient.get<Treinamentotipo>(env.baseApiUrl + 'treinamentotipo/listar/tipo/' + tipo);
  }

  salvarTipo(treinamento: Treinamentotipo): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'treinamentotipo/salvar', treinamento);
  }

  


  /* Treinamento participante */

  listarParticipante(id: number): Observable<Treinamentoparticipante> {
    return this.httpClient.get<Treinamentoparticipante>(env.baseApiUrl + 'treinamentos/participantes/' + id );
  }

  listarTreinamentosVencidos(): Observable<Treinamentoparticipante> {
    return this.httpClient.get<Treinamentoparticipante>(env.baseApiUrl + 'treinamentos/participantes/vencidos');
  }

  //Loja
  listarTreinamentosVencidosLoja(idloja: number): Observable<Treinamentoparticipante> {
    return this.httpClient.get<Treinamentoparticipante>(env.baseApiUrl + 'treinamentos/participantes/vencidos/loja/' + idloja );
  }

   //Funcao
   listarTreinamentosVencidosFuncao(idfuncao: number): Observable<Treinamentoparticipante> {
    return this.httpClient.get<Treinamentoparticipante>(env.baseApiUrl + 'treinamentos/participantes/vencidos/funcao/' + idfuncao );
  }

  //Funcao Loja
  listarTreinamentosVencidosFuncaoLoja(idfuncao: number, idloja: number): Observable<Treinamentoparticipante> {
    return this.httpClient.get<Treinamentoparticipante>(env.baseApiUrl + 'treinamentos/participantes/vencidos/' + idfuncao  + '/' + idloja);
  }

  salvarParticipante(treinamentoParticipante: Treinamentoparticipante): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'treinamentos/participante/salvar', treinamentoParticipante);
  }

  salvarNotaParticipante(treinamentoParticipante: Treinamentoparticipante): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'treinamentos/participante/nota', treinamentoParticipante);
  }

  deletarParticipante(treinamentoParticipante: Treinamentoparticipante): Observable<any> {
   /* const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: treinamentoParticipante,
    };
    return this.httpClient.post<any>(env.baseApiUrl + 'treinamentos/participante/deletar', options);*/
    return this.httpClient.delete<any>(env.baseApiUrl + 'treinamentos/participante/deletar/' + treinamentoParticipante.idtreinamentoparticipante);
  }



}
