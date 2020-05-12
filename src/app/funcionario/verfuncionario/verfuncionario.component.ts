import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from '../funcionario.service';
import { Funcionario } from '../model/funcionario';

@Component({
  selector: 'app-verfuncionario',
  templateUrl: './verfuncionario.component.html',
  styleUrls: ['./verfuncionario.component.scss']
})
export class VerfuncionarioComponent implements OnInit {

  formulario: FormGroup;
  funcionario: Funcionario;
  pessoaJuridica = false;
  pessoaFisica = false;
  
  data: Date;
  
  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.funcionario = this.funcionarioService.getFuncionario();
    this.formulario = this.formBuilder.group({
        idfuncionario: [this.funcionario.idfuncionario],
        nome: [this.funcionario.nome],
        dataadmissao: [this.funcionario.dataadmissao],
        situacao: [this.funcionario.situacao],
        funcao: [this.funcionario.funcao.nome],
        cbo: [this.funcionario.funcao.cbo],
        loja: [this.funcionario.loja.nome],
        cpf: [this.funcionario.cpf],
        rg: [this.funcionario.rg],
        uf: [this.funcionario.uf],
        datanascimento: [this.funcionario.datanascimento],
        pis: [this.funcionario.pis],
        ctps: [this.funcionario.ctps],
        serie: [this.funcionario.serie],
        sexo: [this.funcionario.sexo],
        matricula: [this.funcionario.matricula],
        setor: [this.funcionario.setor.nome],
        datasituacao: [this.funcionario.datasituacao],
        dataexp1: [this.funcionario.dataexp1],
        dataexp2: [this.funcionario.dataexp2],
        diasexp1: [this.funcionario.diasexp1],
        diasexp2: [this.funcionario.diasexp2],
        pcd: [this.funcionario.pcd],
        tipopcd: [this.funcionario.tipopcd],
        fone: [this.funcionario.fone],
        nacionalidade: [this.funcionario.nacionalidade],
      });
      let pcd;
      if (this.funcionario.pcd === true) {
        pcd = 'SIM';
      } else pcd = "NÃO";
      this.formulario.patchValue({
        pcd: pcd,
      })
    }
    
  voltar() {
    this.funcionarioService.setFuncionario(null);
    this.formulario.reset();
    this.router.navigate(['/consfuncionario']);
  }

}