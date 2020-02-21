import { Codigoafastamento } from './codigoafastamento';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Funcionario } from 'src/app/funcionario/model/funcionario';

export class Historicosituacao {

    idhistoricosituacao: number;
    data: Date;
    observacao: string;
    funcionario: Funcionario;
    codigoafastamento: Codigoafastamento;
    usuario: Usuario;
}