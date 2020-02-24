import { Clinicapagto } from './Clinicapagto';
import { Asotipo } from 'src/app/asocontrole/model/asotipo';

export class Clinicapagtoexame {

    idclinicapagtoexame: number;
    quantidade: number;
    valorunitario: number;
    valortotal: number;
    clinicapagto: Clinicapagto;
    asotipo: Asotipo;
}