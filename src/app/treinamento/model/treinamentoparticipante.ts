import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Treinamento } from './treinamento';
import { Loja } from 'src/app/loja/model/loja';

export class Treinamentoparticipante {

    idtreinamentoparticipante: number;
    compareceu: boolean;
    nota: number;
    funcionario: Funcionario;
    treinamento: Treinamento;
    loja: Loja;
}