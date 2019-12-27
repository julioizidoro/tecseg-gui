import { Acesso } from 'src/app/acesso/model/acesso';


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
}
