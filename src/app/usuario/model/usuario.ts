import { Acesso } from 'src/app/acesso/model/acesso';


export class Usuario {
    idusuario: number;
    nome: string;
    datanascimento: Date;
    login: string;
    senha: string;
    email: string;
    fonecelular: string;
    situacao: boolean;
    urlfoto: string;
    acesso: Acesso;
}
