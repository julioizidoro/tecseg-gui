import { Loja } from 'src/app/loja/model/loja';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Funcionario } from 'src/app/funcionario/model/funcionario';

export class Salutar {
    idsalutar: number;
    dataemissao: Date;
    loja: Loja;
    usuario: Usuario;
    funcionarioList : Funcionario[];
}
