import { Produtogrupo } from 'src/app/produtogrupo/model/produtogrupo';


export class Produto {

    idproduto: number;
    descricao: string;
    unidade: string;
    produtogrupo: Produtogrupo;
    
}