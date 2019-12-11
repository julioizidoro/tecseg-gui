import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Clinica } from 'src/app/clinica/model/clinica';
import { Asotipo } from 'src/app/asocontrole/model/asotipo';

export class Asoagenda {

    idasoagenda: number;
    dataexame: Date;
    horaexame: string;
    situacao: string;
    funcionario: Funcionario;
    asotipo: Asotipo;
    funcao: Funcao;
    clinica: Clinica;
}
