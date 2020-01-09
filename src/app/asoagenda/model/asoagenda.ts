import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Clinica } from 'src/app/clinica/model/clinica';
import { Asotipo } from 'src/app/asocontrole/model/asotipo';
import { Usuario } from 'src/app/usuario/model/usuario';

export class Asoagenda {

    idasoagenda: number;
    dataexame: Date;
    horaexame: string;
    situacao: string;
    datacancelamento: Date;
    funcionario: Funcionario;
    funcao: Funcao;
    usuario: Usuario;
}
