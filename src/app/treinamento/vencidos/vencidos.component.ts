import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TreinamentoService } from '../treinamento.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { Loja } from 'src/app/loja/model/loja';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Treinamentoparticipante } from '../model/treinamentoparticipante';
import { Participanteexcel } from '../model/participanteexcel';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { LojaService } from 'src/app/loja/loja.service';

@Component({
  selector: 'app-vencidos',
  templateUrl: './vencidos.component.html',
  styleUrls: ['./vencidos.component.scss']
})
export class VencidosComponent implements OnInit {

  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime = true;
  listaLoja: Loja[];
  listaFuncao: Funcao[];
  listaParticipantes: Treinamentoparticipante[];
  listaExportar: Participanteexcel[];

  constructor(
    private treinamentoService: TreinamentoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private funcionarioService: FuncionarioService,
    private funcaoService: FuncaoService,
    private lojaService: LojaService,
  ) { }

  ngOnInit(): void {
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
     loja: [null],
     funcao: [null],
    });
    this.consultar();
  }

  consultar() {
    this.treinamentoService.listarTreinamentosVencidos().subscribe(
      resposta => {
        this.listaParticipantes = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  pesquisar() {
    let loja = this.formulario.get('loja').value;
    let funcao = this.formulario.get('funcao').value;
    if ((loja === null) && (funcao === null)) {
      this.pesquisarData();
    }else if ((loja != null) && (funcao != null)) {
      this.pesquisarFuncaoLoja(funcao, loja);
    } else if ((loja != null) && (funcao === null)) {
      this.pesquisarLoja(loja);
    } else if ((loja === null) && (funcao != null)) {
      this.pesquisarFuncao(funcao);
    } 
  }

  pesquisarData() {
    this.treinamentoService.listarTreinamentosVencidos().subscribe(
      resposta => {
        this.listaParticipantes = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  pesquisarLoja(loja: Loja) {
    this.treinamentoService.listarTreinamentosVencidosLoja(loja.idloja).subscribe(
      resposta => {
        this.listaParticipantes = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  pesquisarFuncao(funcao: Funcao) {
    this.treinamentoService.listarTreinamentosVencidosFuncao(funcao.idfuncao).subscribe(
      resposta => {
        this.listaParticipantes = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  pesquisarFuncaoLoja(funcao: Funcao, loja: Loja) {
    this.treinamentoService.listarTreinamentosVencidosFuncaoLoja(funcao.idfuncao, loja.idloja).subscribe(
      resposta => {
        this.listaParticipantes = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  pesquisarLimpar(){ 
    this.consultar();
  }

  exportarExcel() {
    this.listaExportar = [];
    for (let participante of this.listaParticipantes) {
      let exportar= new Participanteexcel();
      exportar.nome = participante.funcionario.nome;
      exportar.treinamento = participante.treinamento.treinamentotipo.nome;
      exportar.datatreinamento = participante.treinamento.data;
      exportar.datavencimento = participante.treinamento.datavencimento;
      exportar.funcao = participante.funcionario.funcao.nome;
      exportar.loja = participante.funcionario.loja.nome
      this.listaExportar.push(exportar);
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listaExportar);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    //this.saveAsExcelFile(excelBuffer, "consulta-ecasan");
    XLSX.writeFile(workbook, this.toExportFileName("treinamentosvencidos"));

  }

  toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  carregarComboBox() {
    this.funcaoService.listar().subscribe(resposta => {
      this.listaFuncao = resposta as any;
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );
    this.lojaService.listar().subscribe(resposta => {
      this.listaLoja = resposta as any;
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );
  }
  

}
