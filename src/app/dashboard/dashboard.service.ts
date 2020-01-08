import { Numeroasos } from './model/numeroasos';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getNumeros(): Observable<Numeroasos> {
    return this.httpClient.get<Numeroasos>(env.baseApiUrl + 'numeroasos/id');
  }
}
