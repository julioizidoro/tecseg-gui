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
    const dataInicial = this.formulario.get('datainicial').value;
    const dataFinal = this.formulario.get('datafinal').value;
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
  this.listaExportar=[];
  for (this.sf of listasf) {
    this.exportar =  new ExportarSalutar();
    this.exportar.codigoUnidade = this.sf.salutar.loja.codigosalutar;
    this.exportar.nomeUnidade = this.sf.salutar.loja.razaosicual;
    this.exportar.codigosetor = this.sf.setor.idsetor;
    this.exportar.nomesetor = this.sf.setor.nome;
    this.exportar.codigocargo = this.sf.funcao.idfuncao;
    this.exportar.nomecargo = this.sf.funcao.nome;
    this.exportar.matricula = this.sf.funcionario.idfuncionario;
    this.exportar.codigofuncionario = this.sf.funcionario.idfuncionario;
    this.exportar.Nomefuncionario = this.sf.funcionario.nome;
    this.exportar.dtNascimento = this.sf.funcionario.datanascimento;
    this.exportar.sexo = this.sf.funcionario.sexo;
    if (this.sf.situacao === 'Admissao') {
     this.exportar.situacao = 'S'; 
    } else if (this.sf.situacao === 'Atibo') {
      this.exportar.situacao = 'S';
    } else if (this.sf.situacao === 'Afastado') {
      this.exportar.situacao = 'A';
    } else if (this.sf.situacao === 'demitido') {
      this.exportar.situacao = 'N';
    }
    this.exportar.dtAdmissao = this.sf.funcionario.dataadmissao;
    this.exportar.pispasep = this.sf.funcionario.pis;
    this.exportar.contratacao = '1';
    this.exportar.ufrg = '';
    this.exportar.cpf = this.sf.funcionario.cpf;
    this.exportar.ctps = this.sf.funcionario.ctps;
    this.exportar.cbo = this.sf.funcao.cbo;
    this.exportar.serieCTPS = this.sf.funcionario.serie;
    this.listaExportar.push(this.exportar);
  }
  
  //https://stackoverflow.com/questions/39177183/how-to-export-json-to-csv-or-excel-angular-2

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listaExportar);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  //this.saveAsExcelFile(excelBuffer, "consulta-ecasan");
  XLSX.writeFile(workbook, this.toExportFileName("salutar_" + salutar.loja.idloja));
}
)

  
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

deletar(salutar: Salutar) {
  this.salutarService.deletar(salutar).subscribe (
    resposta => {
      resposta as any;
    }
  )  
}

}
