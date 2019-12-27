import { Loja } from 'src/app/loja/model/loja';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Salutarfuncionario } from './salutarfuncionario';

export class Salutar {
    idsalutar: number;
    nome: string;
    dataemissao: Date;
    admitidos: number;
    afastados: number;
    inativos: number;
    ativos: number;
    total: number
    loja: Loja;
    usuario: Usuario;
}
