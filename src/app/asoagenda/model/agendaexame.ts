import { Asoagenda } from './asoagenda';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Clinica } from 'src/app/clinica/model/clinica';
import { Asotipo } from 'src/app/asocontrole/model/asotipo';

export class Agendaexame {

    idagendaexame: number;
    situacao: string;
    datalancamento: Date;
    asoagenda: Asoagenda;
    usuario: Usuario;
    clinica: Clinica;
    asotipo: Asotipo;

}