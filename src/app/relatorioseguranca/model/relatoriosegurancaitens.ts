import { Setor } from 'src/app/setor/model/setor';
import { Relatorioseguranca } from './relatorioseguranca';

export class Relatoriosegurancaitens {

    idrelatoriosegurancaitens: number;
    constatacao: string;
    adequacao: string;
    urlfoto: string;
    uploadimagem: boolean;
    relatorioseguranca: Relatorioseguranca;
    setor: Setor;
}