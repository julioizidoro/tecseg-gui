import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Usuario } from 'src/app/usuario/model/usuario';

export class Situacao {

  idsituacao: number;
  data: Date;
  status: boolean;
  situacao: string;
  funcionario: Funcionario;
  usuario: Usuario;

}
