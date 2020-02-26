import { Loja } from 'src/app/loja/model/loja';
import { Usuario } from 'src/app/usuario/model/usuario';

export class Relatorioseguranca {

    idrelatorioseguranca: number;
    data: Date;
    loja: Loja;
    usuario: Usuario;
}