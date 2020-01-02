import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Treinamentotipo } from '../model/treinamentotipo';
import { Router } from '@angular/router';
import { TreinamentoService } from '../treinamento.service';
import { Treinamento } from '../model/treinamento';

@Component({
  selector: 'app-cadtreinamento',
  templateUrl: './cadtreinamento.component.html',
  styleUrls: ['./cadtreinamento.component.scss']
})
export class CadtreinamentoComponent implements OnInit {
  formulario: FormGroup;
  treinamentostipo: Treinamentotipo[];
  treinamento: Treinamento;
  public maskHora = [/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/];
  
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private treinamentoService: TreinamentoService,
    
  ) { }

  ngOnInit() {
    this.treinamento = this.treinamentoService.getTreinamento();
    if (this.treinamento !=null) {
      this.formulario = this.formBuilder.group({
        idtreinamento: this.treinamento.idtreinamento,
        data: this.treinamento.data,
        hora: this.treinamento.hora,
        duracao: this.treinamento.duracao,
        instrutor: this.treinamento.instrutor,
        conteudo: this.treinamento.conteudo,
        local: this.treinamento.local,
        cidade: this.treinamento.cidade,
        situacao: this.treinamento.situacao,
        treinamentotipo: this.treinamento.treinamentotipo,
        usuario: this.treinamento.usuario,
      });  
    } else {
      this.formulario = this.formBuilder.group({
        idtreinamento: [null],
        data: [null],
        hora: [null],
        duracao: [null],
        instrutor: [null],
        conteudo: [null],
        local: [null],
        cidade: [null],
        situacao: [null],
        treinamentotipo: [null],
        usuario: [null],
      });  
    }
    this.carregarComboBox();
  }

  carregarComboBox() {
    this.treinamentoService.listarTipo().subscribe(resposta => {
      this.treinamentostipo = resposta as any;
    });
  }

  setTreinamentoTipo() {
    let tipo = this.formulario.get('treinamentotipo').value;
    console.log(tipo);
    if ( tipo !=null ) {
      this.formulario.get('conteudo').setValue(tipo.conteudo);
    } 
  }

  compararTreinamentoTipo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  salvar() {
    this.treinamento = this.formulario.value;
    this.treinamentoService.salvar(this.treinamento).subscribe(resposta => {
      this.treinamento = resposta as any;
      this.formulario.reset();
      this.treinamentoService.setTreinamento(null);
      this.router.navigate([ '/constreinamento']);
    });  
  }

  cancelar() {
    this.formulario.reset();
    this.treinamentoService.setTreinamento(null);
    this.router.navigate([ '/constreinamento']);
  }

}
