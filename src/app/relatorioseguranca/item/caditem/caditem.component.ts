import { Component, OnInit } from '@angular/core';
import { Relatoriosegurancaitens } from '../../model/relatoriosegurancaitens';
import { RelatoriosegurancaService } from '../../relatorioseguranca.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Setor } from 'src/app/setor/model/setor';
import { SetorService } from 'src/app/setor/setor.service';

@Component({
  selector: 'app-caditem',
  templateUrl: './caditem.component.html',
  styleUrls: ['./caditem.component.scss']
})
export class CaditemComponent implements OnInit {

  rsItem: Relatoriosegurancaitens;
  file: File;
  formulario: FormGroup;
  setor: Setor;
  listaSetor: Setor[];
  nomeArquivo: string;

  constructor(
    private rsService: RelatoriosegurancaService,
    private router: Router,
    private setorService: SetorService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.nomeArquivo = 'Selecione uma foto';
    this.carregarComboBox();
    if (this.rsItem == null) {
      this.setor = new Setor();
      this.setor.idsetor = 1;
      this.setor.nome = 'Não cadastrado';
      this.formulario = this.formBuilder.group({
        idrelatoriosegurancaitens: [null],
        constatacao: [null],
        adequacao: [null],
        urlfotos: [null],
        relatorioseguranca: [null],
        setor: [null],

      });

    }
  }


  onChange(event) {
    const selectedFiles = event.srcElement.files as FileList;
    this.file = selectedFiles[0];
    this.nomeArquivo = this.file.name;
    //document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;
 }

 carregarComboBox() {
  this.setorService.listar().subscribe(resposta => {
    this.listaSetor = resposta as any;
  });
}

compararSetor(obj1, obj2) {
  return obj1 && obj2 ? obj1.idsetor === obj2.idSetor : obj1 === obj2;
}

setSetor() {
  this.setor = this.formulario.get('setor').value;
}

salvar() {
  this.rsItem = this.formulario.value;
  this.rsItem.urlfoto = this.nomeArquivo;
  this.rsItem.relatorioseguranca = this.rsService.getRS();
  this.formulario.reset();
    this.rsService.salvarItens(this.rsItem).subscribe(resposta => {
      this.rsItem = resposta as any;
      this.rsItem = new Relatoriosegurancaitens();
      this.setor = new Setor();
      this.setor.idsetor = 1;
      this.setor.nome = 'Não cadastrado';
      this.file = null;
      this.nomeArquivo = 'Selecione uma foto';

    });
  
}

cancelar(){
  this.formulario.reset();
  this.rsService.setRS(null);
}

 

}
