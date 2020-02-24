import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Clinicapagto } from '../model/Clinicapagto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicapagtoService {

  private clinicaPagto: Clinicapagto;

  constructor(
    private httpClient: HttpClient
  ) { }

  setClinicaPagto(clinicaPagto: Clinicapagto) {
    this.clinicaPagto = clinicaPagto;
  }

  getClinicaPagto(){
    return this.clinicaPagto;
  }

  listarClinicaPagto(): Observable<Clinicapagto> {
    return this.httpClient.get<Clinicapagto>(env.baseApiUrl + 'clinicapagtos');
  }
}
