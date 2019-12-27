import { Component, OnInit } from '@angular/core';
import { Salutarfuncionario } from '../../model/salutarfuncionario';
import { Salutar } from '../../model/salutar';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { Router } from '@angular/router';
import { SalutarService } from '../../salutar.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExportarSalutar } from '../../model/exportarSalutar';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-vissalutar',
  templateUrl: './vissalutar.component.html',
  styleUrls: ['./vissalutar.component.scss']
})
export class VissalutarComponent implements OnInit {

  salutar: Salutar;
  isFirstOpen = true;
  oneAtATime: true;
  sf: Salutarfuncionario;
  salutarFuncionario: Salutarfuncionario[];
  exportar : ExportarSalutar;
  listaExportar : ExportarSalutar[];
  
  
  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private salutarService: SalutarService,
  ) { }

  ngOnInit() {
    this.salutar = this.salutarService.getSalutar(); 
    if (this.salutar != null) {
      this.salutarService.listarSalutarFuncionario(this.salutar).subscribe (
        resposta => {
          this.salutarFuncionario = resposta as any;
        });
    }
  }

 cancelar() {
    this.salutarService.setSalutar(null);
    this.router.navigate(['/conssalutar']);
  }

  exportarExcel() {
    this.listaExportar=[];
    for (this.sf of this.salutarFuncionario) {
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
      if (this.sf.situacao == 'Admissao') {
       this.exportar.situacao = 'S'; 
      } else if (this.sf.situacao == 'Atibo') {
        this.exportar.situacao = 'S';
      } else if (this.sf.situacao == 'Afastado') {
        this.exportar.situacao = 'A';
      } else if (this.sf.situacao == 'Inativo') {
        this.exportar.situacao = 'N';
      }else this.exportar.situacao ='';
      this.exportar.dtAdmissao = this.sf.funcionario.dataadmissao;
      if (this.sf.situacao == 'Inativo'){
        this.exportar.dTDemissao = this.sf.datasituacao;
      } else this.exportar.dtDemissao = '';
      this.exportar.estadoCivil = '';
      this.exportar.pispasep = this.sf.funcionario.pis;
      this.exportar.contratacao = '1';
      this.exportar.rg = this.sf.funcionario.rg;
      this.exportar.ufrg = '';
      this.exportar.cpf = this.sf.funcionario.cpf;
      this.exportar.ctps = this.sf.funcionario.ctps;
      this.exportar.endereco = '';
      this.exportar.bairro = '';
      this.exportar.cidade ='';
      this.exportar.uf = '';
      this.exportar.cep = '';
      this.exportar.tel = '';
      this.exportar.naturalidade = '';
      this.exportar.cor='';
      this.exportar.email = '';
      this.exportar.deficientcia = '';
      this.exportar.cbo = this.sf.funcao.cbo;
      this.exportar.GFIP = '';
      this.exportar.enderecoUnidade = '';
      this.exportar.bairroUnidade = '';
      this.exportar.cidadeUnidade = '';
      this.exportar.estadoUnidade = '';
      this.exportar.cepUnidade = '';
      this.exportar.inscricaoUniade = '';
      this.exportar.tel1Unidade = '';
      this.exportar.tel2Unidade = '';
      this.exportar.tel3Unidade = '';
      this.exportar.tel4Unidade = '';
      this.exportar.contatoUnid = '';
      this.exportar.Cnae = '';
      this.exportar.numeroEnderecoFuncionario = '';
      this.exportar.complementoEnderecoFuncionario = '';
      this.exportar.RazaoSocialUnidade = '';
      this.exportar.nomeMaeFuncionario = '';
      this.exportar.centroCusto = '';
      this.exportar.dtUltimoMovimento = '';
      this.exportar.codUnidadeContratante = '';
      this.exportar.RazaoSocial = '';
      this.exportar.cnpj = this.sf.salutar.loja.cnpj;
      this.exportar.turno = '';
      this.exportar.dtemissaocartprof = '';
      this.exportar.serieCTPS = this.sf.funcionario.serie;
      this.exportar.telefoneSMS = '';
      this.exportar.grauRisco = '';
      this.exportar.UFCTPS = '';
      this.exportar.nomeCentroCusto = '';
      this.exportar.AutorizaSMS = '';
      this.exportar.enderecoCobranca
      this.exportar.numeroEnderecoCobrancaUnidade = '';
      this.exportar.bairroCobrancaUnidade = '';
      this.exportar.cidadeCobrancaUnidade = '';
      this.exportar.estadoCobrancaUnidade = '';
      this.exportar.cepCobrancaUnidade = '';
      this.exportar.complementoEnderecoCobrancaUnidade = '';
      this.exportar.remuneracaoMensal ='';
      this.exportar.telefoneComercial = '';
      this.exportar.telefoneCelular = '';
      this.exportar.dataemissaoRG = '';
      this.exportar.codigpPaisNascimento = '';
      this.exportar.origiemDescricaoDetalhada = '';
      this.exportar.unidadeContratante = '';
      this.exportar.escolaridade = '';
      this.exportar.codigoCategoria = '';
      this.exportar.matriculaRH = '';
      this.exportar.genereo = '';
      this.exportar.nomeSocial = '';
      this.exportar.tipoAdmissao = '';
      this.exportar.nomedoPaidoFuncionario = '';
      this.exportar.tipovinculo = '';
      this.exportar.nomedoturno = '';
      this.listaExportar.push(this.exportar);
    }
    
    //https://stackoverflow.com/questions/39177183/how-to-export-json-to-csv-or-excel-angular-2
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listaExportar);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    //this.saveAsExcelFile(excelBuffer, "consulta-ecasan");
    XLSX.writeFile(workbook, this.toExportFileName("salutar_" + this.salutar.nome));
  
    
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
