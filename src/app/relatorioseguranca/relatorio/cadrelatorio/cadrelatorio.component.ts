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
import { roLocale } from 'ngx-bootstrap';
import { AngularValidateBrLibModule } from 'angular-validate-br';
import { Observable } from 'rxjs';

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
  idItem: number;
  novo: boolean;
  

  @ViewChild('modalItens', ) public showModalItensOnClick: ModalDirective;
  


  constructor(
    private rsService: RelatoriosegurancaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private lojaService: LojaService,
  ) { }

  ngOnInit(): void {
    this.novo = this.rsService.getNovo();
    this.carregarComboBox();
    this.iniciarFormulario();
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
      console.log('form');
      this.formulario = this.formBuilder.group({
        idrelatorioseguranca: [null],
        data: [null],
        loja: [null],
        usuario: [null],
      });
    }
  }

  iniciarFormulario() {
    this.itensformulario = this.formBuilder.group({
      idrelatoriosegurancaitens: [null],
      constatacao: [null],
      adequacao: [null],
      urlfoto: [null],
      uploadimagem: [null],
      nomefile: [null],
      relatorioseguranca: [null],
      seotr: [null],
    });
  }

  salvarItem() {
    let rsItem = new Relatoriosegurancaitens();
    rsItem = this.itensformulario.value;
    this.relItens[this.idItem].item = rsItem;
    this.rsService.salvarItens(rsItem).subscribe(
    resposta => {
        let rsItem = resposta as any;
        this.showModalItensOnClick.hide();
      }
    )
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
    this.rsService.setNovo(false);
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

  openModalItens(id: number) {
    this.itensformulario.reset();
    this.idItem = id;
    let relItem = this.relItens[id];
    this.itensformulario = this.formBuilder.group({
      idrelatoriosegurancaitens: relItem.item.idrelatoriosegurancaitens,
      constatacao: relItem.item.constatacao,
      adequacao: relItem.item.adequacao,
      urlfoto: relItem.item.urlfoto,
      uploadimagem: relItem.item.uploadimagem,
      nomefile: relItem.item.nomefile,
      relatorioseguranca: relItem.item.relatorioseguranca,
      setor: relItem.item.setor,
    });
    this.showModalItensOnClick.show();
  }

 
  fileAll(fileInput: any) {
    console.log('aqui');
    for (let i=0;i<this.relItens.length;i++){
      for(let n=0;n<fileInput.target.files.length;n++){
        let file = <File>fileInput.target.files[n];
        if (this.relItens[i].item.urlfoto == file.name) {
          this.relItens[i].file = file;
          this.relItens[i].previewUrl = this.preview(i);
          n = 1000000;
        }
      }
    }
  }


 fileProgress(fileInput: any, id: number) {
  this.relItens[id].file = <File>fileInput.target.files[0];
  this.preview(id);
}

preview(id: number) {
// Show preview 
var mimeType = this.relItens[id].file.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}

var reader = new FileReader();      
reader.readAsDataURL(this.relItens[id].file); 
reader.onload = (_event) => { 
  this.relItens[id].previewUrl = reader.result;
}
return this.relItens[id].previewUrl;
}

onSubmit(id: number) {
  let filename = this.relItens[id].file.name;
  let nome = '';
  for (let i = filename.length - 1; i > 0; i--) {
    if (filename[i] !== '.' ) {
       nome = filename[i] + nome;
    } else {
      i = -100;
    }
  }
  const iditem = this.relItens[id].item.idrelatoriosegurancaitens;
  filename = iditem.toString() + '.' + nome;
  this.rsService.upload(this.relItens[id].file, filename).subscribe(
      resposta => {
        const uri = resposta as any;
        this.relItens[id].item.urlfoto = 'https://tecseg-img.s3.us-east-2.amazonaws.com/rs/' + filename;
        this.relItens[id].item.nomefile = filename;
        this.relItens[id].item.uploadimagem = true;
        this.rsService.salvarItens(this.relItens[id].item).subscribe(
         resposta1 => {
           this.relItens[id].item = resposta1 as any;
         },
         err1 => {
           console.log(err1.error.erros.join(' '));
          }
         );
      },
      err => {
       console.log(err.error.erros.join(' '));
      }
   );
}

removerFoto(id: number) {
  const nome = this.relItens[id].item.nomefile;
  this.relItens[id].item.urlfoto = "sem foto";
  this.relItens[id].item.uploadimagem = false;
  this.relItens[id].previewUrl = null;
  this.relItens[id].file = null;
  this.rsService.deletaFile(nome).subscribe(
    resposta2 => {
      resposta2 as any;
      this.rsService.salvarItens(this.relItens[id].item).subscribe(
        resposta1 => {
          this.relItens[id].item = resposta1 as any;
         
        },
        err1 => {
          console.log(err1.error.erros.join(' '));
        }
      );
    },
    err2 => {
      console.log(err2.error.erros.join(' '));
    }
  );
  
  
  
  
}





}
