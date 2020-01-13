import { Clinica } from 'src/app/clinica/model/clinica';
import { Agendaexame } from './agendaexame';
import { Usuario } from 'src/app/usuario/model/usuario';

export class Clinicaexame {
    idclinicaexame: number;
    clinica: Clinica;
    agendaexame: Agendaexame;
    usuairo: Usuario;
}
