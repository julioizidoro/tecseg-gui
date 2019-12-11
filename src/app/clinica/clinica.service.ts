import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clinica } from './model/clinica';
import { environment as env } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  constructor( private httpClient: HttpClient ) { }

  listar(): Observable<Clinica> {
    return this.httpClient.get<Clinica>(env.baseApiUrl + 'clinicas');
  }
}
