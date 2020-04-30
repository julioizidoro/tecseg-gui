import { Acesso } from 'src/app/acesso/model/acesso';
import { Funcao } from 'src/app/funcao/model/funcao';


export class Usuario {
    idusuario: number;
    nome: string;
    datanascimento: Date;
    login: string;
    senha: string;
    sexo: string;
    email: string;
    fonecelular: string;
    situacao: boolean;
    acesso: Acesso;
    urlfoto: string;
    urlassinatura: string;
    registromte: string;
    funcao: Funcao;

}
