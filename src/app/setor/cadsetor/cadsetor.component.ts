import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Setor } from '../model/setor';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { AsotipoService } from 'src/app/asocontrole/asotipo.service';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AsocontroleService } from 'src/app/asocontrole/asocontrole.service';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Loja } from 'src/app/loja/model/loja';
import { Asotipo } from 'src/app/asocontrole/model/asotipo';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { SetorService } from '../setor.service';

@Component({
  selector: 'app-cadsetor',
  templateUrl: './cadsetor.component.html',
  styleUrls: ['./cadsetor.component.scss']
})
export class CadsetorComponent implements OnInit {

  formulario: FormGroup;
  setor: Setor;
  funcionarioSelecionado: Funcionario;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private setorService: SetorService,

  ) {
    this.funcionarioSelecionado = new Funcionario();
    this.funcionarioSelecionado.nome = 'Nome do funcioário';
  }


  ngOnInit() {

    this.setor = this.setorService.getSetor();
    if (this.funcionarioService.getFuncionario()!=null) {
      this.funcionarioSelecionado = this.funcionarioService.getFuncionario();
    }
    if (this.setor!=null) {
      console.log(this.setor);
      if (this.funcionarioService.getFuncionario()==null) {
        console.log(this.setor.funcionario);
        this.funcionarioSelecionado = this.setor.funcionario;
      }
      this.formulario = this.formBuilder.group({
        idsetor: this.setor.idsetor,
        nome: this.setor.nome,
        funcionario: this.funcionarioSelecionado,
      });
    } else {

      this.formulario = this.formBuilder.group({
        idsetor: [null],
        nome: [null],
        funcionario: this.funcionarioSelecionado,
      });
    }
  }



  novo() {
    const setor = this.setorService.getSetor();
    if (setor != null) {
      this.funcionarioSelecionado = this.setorService.getSetor().funcionario;
    } else {
      this.funcionarioSelecionado = this.funcionarioService.getFuncionario();
    }
    if ( this.funcionarioSelecionado === null ) {
      this.funcionarioSelecionado = new Funcionario();
      this.funcionarioSelecionado.nome = 'Nome do funcioário';
    } else {

      this.formulario = this.formBuilder.group({
        idsetor: [null],
        nome: [null],
        funcionario: this.funcionarioSelecionado,
      });
    }
  }




  salvar() {
    this.setorService.setSetor(null);
    this.funcionarioService.setFuncionario(null);
    this.setor = this.formulario.value;
    this.setor.funcionario = this.funcionarioSelecionado;
    this.setorService.salvar(this.setor).subscribe(
      resposta => {
        this.setor = resposta as any;
        this.formulario.reset();
        this.router.navigate(['/conssetor']);
      },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );
  }

  cancelar() {
    this.setorService.setSetor(null);
    this.funcionarioService.setFuncionario(null);
    this.formulario.reset();
    this.router.navigate(['/conssetor']);
  }


  consultaFuncionario() {
    this.funcionarioService.setFuncionario(null);
    this.funcionarioService.setRota('cadsetor');
    this.router.navigate(['/consfuncionario']);
  }


}
