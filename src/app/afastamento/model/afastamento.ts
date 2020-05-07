import { Codigoafastamento } from './codigoafastamento';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Situacao } from 'src/app/situacao/model/situacao';


export class Afastamento {

  idafastamento: number;
  data: Date;
  retorno: Date;
  observacao: string;
  dataexame: Date;
  codigoafastamento: Codigoafastamento;
  funcionario: Funcionario;
  usuario: Usuario;
  situacao: Situacao;

}
