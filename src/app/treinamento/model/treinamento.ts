import { Treinamentotipo } from './treinamentotipo';
import { Usuario } from 'src/app/usuario/model/usuario';

export class Treinamento {

    idtreinamento: number;
    data: Date;
    hora: string;
    duracao: string;
    instrutor: string;
    conteudo: string;
    local: string;
    cidade: string;
    situacao: string;
    datavencimento: Date;
    complementotitulo: string;
    assinstrutor: boolean;
    treinamentotipo: Treinamentotipo;
    usuario: Usuario;

}
