import { Loja } from 'src/app/loja/model/loja';

export class Treinamento {

    idtreinamento: number;
    nome: string;
    data: Date;
    instrutor: string;
    situacao: string;
    duracao: string;
    loja: Loja;

}
