import { Setor } from './../../setor/model/setor';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Loja } from 'src/app/loja/model/loja';

export class Funcionario {

  idfuncionario: number;
  nome: string;
  dataadmissao: Date;
  situacao: string;
  funcao: Funcao;
  loja: Loja;
  cpf: string;
  rg: string;
  uf: string;
  datanascimento: Date;
  pis: string;
  ctps: string;
  serie: string;
  sexo: string;
  matricula: number;
  setor: Setor;
}
