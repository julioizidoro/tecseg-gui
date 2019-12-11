import { Usuario } from 'src/app/usuario/model/usuario';

export class Acesso {
    idacesso: number;
    nome: string;
    dashboard: boolean;
    cadastro: boolean;
    cadcliente: boolean;
    cadclienteincluir: boolean;
    cadclienteeditar: boolean;
    cadfornecedor: boolean;
    cadfornecedorincluir: boolean;
    cadfornecedoreditar: boolean;
    cadobras: boolean;
    cadobrasincluir: boolean;
    cadobraseditar: boolean;
    cadfaseobras: boolean;
    cadfaseobraincluir: boolean;
    cadfaseobraseditar: boolean;
    cadsubfaseobras: boolean;
    cadsubfaseobraincluir: boolean;
    cadsubfaseobraeditar: boolean;
    cadprodutos: boolean;
    cadprodutosincluir: boolean;
    cadprodutoseditar: boolean;
    cadgrupocontas: boolean;
    cadgrupocontasincluir: boolean;
    cadgrupocontaseditar: boolean;
    cadplanocontas: boolean;
    cadplanocontasincluir: boolean;
    cadplanocontaseditar: boolean;

    bens: boolean;
    benscontrole: boolean;
    benscontroleincluir: boolean;
    benscontroleeditar: boolean;

    obras: boolean;
    obrainclir: boolean;
    obraeditar: boolean;
    compras: boolean;
    comprassolciitacao: boolean;
    comprassolciitacaoincluir: boolean;
    comprassolciitacaoeditar: boolean;
    compraspedido: boolean;
    compraspedidoincluir: boolean;
    compraspedidoeditar: boolean;

    financeiro: boolean;
    financeirocp: boolean;
    financeirocpincluir: boolean;
    financeirocpeditar: boolean;
    financeirocppagar: boolean;
    financeirocr: boolean;
    financeirocrincluir: boolean;
    financeirocreditar: boolean;
    financeirocrreceber: boolean;
    financeirofc: boolean;

    cadacesso: boolean;
    cadacessoincluir: boolean;
    cadacessoeditar: boolean;
    cadusuario: boolean;
    cadusuarioincluir: boolean;
    cadusuarioeditar: boolean;
    numerousiario: number;
    nomeusuario: string;


}
