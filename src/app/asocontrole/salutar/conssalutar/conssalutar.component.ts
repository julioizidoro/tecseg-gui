import { Component, OnInit, ViewChild } from '@angular/core';
import { Salutar } from '../../model/salutar';
import { Loja } from 'src/app/loja/model/loja';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LojaService } from 'src/app/loja/loja.service';
import { SalutarService } from '../../salutar.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExportarSalutar } from '../../model/exportarSalutar';
import { Salutarfuncionario } from '../../model/salutarfuncionario';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-conssalutar',
  templateUrl: './conssalutar.component.html',
  styleUrls: ['./conssalutar.component.scss']
})
export class ConssalutarComponent implements OnInit {

  salutar: Salutar[];
  lojas: Loja[];
  isFirstOpen = false;
  oneAtATime: true;
  formulario: FormGroup;
  sformulario: FormGroup;
  lojaSelecionada: Loja;
  listaExportar : ExportarSalutar[];
  exportar : ExportarSalutar;
  sf : Salutarfuncionario;
  

  constructor(
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private salutarService: SalutarService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carregarComboBox();
    this.consultar();
    this.formulario = this.formBuilder.group({
      datainicial: [null],
      datafinal:  [null],
      loja: [null],
    });
    
  }


  carregarComboBox() {
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get('loja').value;
  }

  pesquisar() {
    let dataInicial = this.formulario.get('datainicial').value;
    let dataFinal = this.formulario.get('datafinal').value;
    this.lojaSelecionada = this.formulario.get('loja').value;
    if ((dataInicial != null) && (dataFinal != null) && (this.lojaSelecionada != null)) {
      this.salutarService.pesquisarLojaData(this.lojaSelecionada, dataInicial, dataFinal).subscribe(resposta => {
        this.salutar = resposta as any;
      });
    } else if ((dataInicial != null) && (dataFinal != null)) {
      this.salutarService.listarData(dataInicial, dataFinal).subscribe(resposta => {
        this.salutar = resposta as any;
      });
    } else if (this.lojaSelecionada != null) {
      this.salutarService.pesquisarLojaId(this.lojaSelecionada).subscribe(resposta => {
        this.salutar = resposta as any;
      });
  }
}

  limpar(){
    this.consultar();
  }

  consultar() {
      this.salutarService.listar().subscribe(
      resposta => {
        this.salutar = resposta as any;
      }
    );
}

gerar() {
  this.salutarService.setSalutar(null);
  this.router.navigate(['/cadsalutar']);
}

editar(salutar: Salutar) {
  this.salutarService.setSalutar(salutar);
  this.router.navigate(['/cadsalutar']);
}

exportarExcel(salutar : Salutar) {
  let listasf = [];
  
  this.salutarService.listarSalutarFuncionario(salutar).subscribe (
    resposta => {
      listasf = resposta as any;
    }
  )
  this.listaExportar=[];

  
  for (let sf of listasf) {
    this.exportar =  new ExportarSalutar();
    this.exportar.codigoUnidade = sf.
    this.exportar.matricula = this.imovel.matricula;
    this.exportar.nomeproprietario = this.imovel.nomeproprietario;
    this.exportar.cpfcasan = this.imovel.cpfcasan;
    this.exportar.locatario = this.imovel.locatario;
    this.exportar.cpflocatario = this.imovel.cpflocatario;
    this.exportar.situacaolink = this.imovel.situacaolink;
    this.exportar.proprietariocasan = this.imovel.proprietariocasan;
    this.exportar.usuarioatual = this.imovel.usuarioatual;
    this.exportar.situacao = this.imovel.situacao;
    this.exportar.descricaosituacao = this.imovel.descricaosituacao;
    if (this.imovel.listaFatura != null) {
      for (let i =0;i<this.imovel.listaFatura.length;i++){
        if (i===0){
          this.exportar.ref1 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor1 = this.imovel.listaFatura[i].valor;
        }else if (i==1) {
          this.exportar.ref2 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor2 = this.imovel.listaFatura[i].valor;
        }else if (i==2) {
          this.exportar.ref3 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor3 = this.imovel.listaFatura[i].valor;
        }else if (i==3) {
          this.exportar.ref4 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor4 = this.imovel.listaFatura[i].valor;
        }else if (i==4) {
          this.exportar.ref5 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor5 = this.imovel.listaFatura[i].valor;
        }else if (i==5) {
          this.exportar.ref6 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor6 = this.imovel.listaFatura[i].valor;
        }else if (i==6) {
          this.exportar.ref7 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor7 = this.imovel.listaFatura[i].valor;
        }else if (i==7) {
          this.exportar.ref8 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor8 = this.imovel.listaFatura[i].valor;
        }else if (i==8) {
          this.exportar.ref9 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor9 = this.imovel.listaFatura[i].valor;
        }else if (i==9) {
          this.exportar.ref10 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor10 = this.imovel.listaFatura[i].valor;
        }else if (i==10) {
          this.exportar.ref10 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor10 = this.imovel.listaFatura[i].valor;
        }else if (i==11) {
          this.exportar.ref12 = this.imovel.listaFatura[i].referencia;
          this.exportar.valor12 = this.imovel.listaFatura[i].valor;
        }
      }
    } 
    if (this.exportar != null){
      this.listaExportar.push(this.exportar);
    }
    
  }
  
  //https://stackoverflow.com/questions/39177183/how-to-export-json-to-csv-or-excel-angular-2

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listaExportar);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  //this.saveAsExcelFile(excelBuffer, "consulta-ecasan");
  XLSX.writeFile(workbook, this.toExportFileName("consulta-ecsan"));
  
}

private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

toExportFileName(excelFileName: string): string {
  return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
}

}
