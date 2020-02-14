import { Estoque } from 'src/app/estoque/model/estoque';
import { Epitipo } from '../tipo/model/epitipo';


export class Epi {

    idepi : number;
    diasrevisao: number;
    diasvalidade: number;
    devolver: string;
    epitipo: Epitipo;
    estoque: Estoque;

}