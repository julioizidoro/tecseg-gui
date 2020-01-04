import { Funcao } from 'src/app/funcao/model/funcao';
import { Setor } from 'src/app/setor/model/setor';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Salutar } from './salutar';

export class Salutarfuncionario {

    idsalutarfuncionario: number;
    datasituacao: Date;
    situacao: string;
    funcionario: Funcionario;
    funcao: Funcao;
    setor: Setor;
    salutar: Salutar;
}
