import { Component, OnInit, ViewChild } from '@angular/core';
import { Relatorioseguranca } from '../../model/relatorioseguranca';
import { Relatoriosegurancaitens } from '../../model/relatoriosegurancaitens';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RelatoriosegurancaService } from '../../relatorioseguranca.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { ThrowStmt } from '@angular/compiler';
import { Loja } from 'src/app/loja/model/loja';
import { LojaService } from 'src/app/loja/loja.service';
import { Relitem } from '../../model/relitem';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-cadrelatorio',
  templateUrl: './cadrelatorio.component.html',
  styleUrls: ['./cadrelatorio.component.scss']
})
export class CadrelatorioComponent implements OnInit {

  formulario: FormGroup;
  rs: Relatorioseguranca;
  rsItens: Relatoriosegurancaitens[];
  relItens: Relitem[];
  lojas: Loja[];
  lojaSelecionada: Loja;
  itensformulario: FormGroup;
  

  @ViewChild('modelItens', ) public showModalItensOnClick: ModalDirective;
  @ViewChild('modalUpload', ) public showModalUploadOnClick: ModalDirective;
  


  constructor(
    private rsService: RelatoriosegurancaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private lojaService: LojaService,
  ) { }

  ngOnInit(): void {
    this.carregarComboBox();
    this.rs = this.rsService.getRS();
    if (this.rs!=null) {
      this.formulario = this.formBuilder.group({
        idrelatorioseguranca: this.rs.idrelatorioseguranca,
        data: this.rs.data,
        loja: this.rs.loja,
        usuario: this.rs.usuario,
      });
      this.rsService.listarItens(this.rs.idrelatorioseguranca).subscribe(
        resposta => {
          this.rsItens = resposta as any;
          this.relItens = [];
          for (let item of this.rsItens ) {
            let rel = new  Relitem();
            rel.item = item;
            this.relItens.push(rel);
          }
        }
      );
    } else {
      this.formulario = this.formBuilder.group({
        idrelatorioseguranca: [null],
        data: [null],
        loja: [null],
        usuario: [null],
      });
    }
  }

  iniciarFormulario() {
    this.formulario = this.formBuilder.group({
      idrelatoriosegurancaitens: [null],
      constatacao: [null],
      adequacao: [null],
      urlfoto: [null],
      relatorioseguranca: [null],
      seotr: [null],
    });
  }

  salvarItem() {
    let rsItem = new Relatoriosegurancaitens();
    let relItem = new Relitem();
    rsItem = this.itensformulario.value();
    
    this.rsService.salvarItens(rsItem).subscribe(
      resposta => {
        rsItem = resposta as any;
        relItem.item = rsItem;
        let index = this.relItens.indexOf(relItem);
        this.relItens[index] = relItem;
        this.rsService.setRelItem(null);
      }
    );
    this.showModalItensOnClick.hide();
  }

  salvarRelatorio() {
    this.rs = this.formulario.value;
    this.rs.usuario = this.authService.getUsuario();
    this.rsService.salvar(this.rs).subscribe(
      resposta => {
        this.rs = resposta as any;
        this.rsService.setRS(null);
        this.router.navigate(['/consrs']);
      }
    )
  }

  cancelarRelatorio() {
    this.formulario.reset();
    this.rsService.setRS(null);
    this.router.navigate(['/consrs']);
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get('loja').value;
  }

  carregarComboBox() {
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
  }

  openModalItens(relItem: Relitem) {
    this.itensformulario.reset();
    this.formulario = this.formBuilder.group({
      idrelatoriosegurancaitens: relItem.item.idrelatoriosegurancaitens,
      constatacao: relItem.item.constatacao,
      adequacao: relItem.item.adequacao,
      urlfoto: relItem.item.urlfoto,
      relatorioseguranca: relItem.item.relatorioseguranca,
      setor: relItem.item.setor,
    });
    this.rsService.setRelItem(relItem);
    this.showModalItensOnClick.show();
  }

  openModalUpload(rsItem: Relatoriosegurancaitens) {
    this.rsService.setRSItem(rsItem);
    this.showModalUploadOnClick.show();
  }

  
 

 


 fileProgress(fileInput: any, relItem: Relitem) {
  relItem.file = <File>fileInput.target.files[0];
  this.preview(relItem);
}

preview(relItem: Relitem) {
// Show preview 
var mimeType = relItem.file.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}

var reader = new FileReader();      
reader.readAsDataURL(relItem.file); 
reader.onload = (_event) => { 
  relItem.previewUrl = reader.result;
  let index = this.relItens.indexOf(relItem);
  this.relItens[index] = relItem;
}
}

onSubmit() {

}



}
