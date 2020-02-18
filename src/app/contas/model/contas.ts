import { Clientes } from 'src/app/clientes/model/clientes';

export class Contas {

    idcontas: number;
    documento: string;
    datacompra: Date;
    datavencimento: Date;
    datapagamento: Date;
    valorcompra: number;
    valorpago: number;
    formapagamento: string;
    observacao: string;
    tipo: string;
    clientes: Clientes;
}