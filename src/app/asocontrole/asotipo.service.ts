import { Asotipo } from './model/asotipo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';

@Injectable()
export class AsotipoService {

  constructor( private httpClient: HttpClient ) { }

  listar(): Observable<Asotipo> {
    return this.httpClient.get<Asotipo>(env.baseApiUrl + 'asotipo');
  }
}
