import { Clinica } from './clinica';
import { Loja } from 'src/app/loja/model/loja';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Clinicapagtoexame } from './clinicapagtoexame';

export class Clinicapagto {

    idclinicapagto: number;
    funcionarios: number;
    valorfuncionarios: number;
    valorexames: number;
    valortotal: number;
    mesano: string;
    clinica: Clinica;
    loja: Loja;
    usuario: Usuario;
    clinicapagtoexameList: Clinicapagtoexame[];
}