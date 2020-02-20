import { FuncionarioService } from './../../funcionario/funcionario.service';
import { UsuarioService } from './../../usuario/usuario.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { parse } from 'querystring';
import { AlertModelService } from 'src/app/share/alert-model.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  clicked: boolean;
  usuario: Usuario;
  formulario: FormGroup;
  file: File;

  @ViewChild('mudarsenha') public showModalMudarSenhaOnClick: ModalDirective;
  @ViewChild('alterarfoto') public showModalAlterarFotoOnClick: ModalDirective;

  constructor(
      private authService: AuthService,
      private router: Router,
      private formBuilder: FormBuilder,
      private usuarioService: UsuarioService,
      private funcionarioService: FuncionarioService,
      private alertService: AlertModelService,
  ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.setFormulario();
    this.usuario = this.authService.getUsuario();
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  logof() {
    this.authService.fazerLogof();
    this.authService.mostrarMenuEmitter.unsubscribe();
    this.router.navigate(['/login']);
  }

  setFormulario() {
    this.formulario = this.formBuilder.group({
      senhaatual: [null],
      novasenha: [null],
      confirmanovasenha: [null],
    });
  }

  confirmarModalMudarSenha() {
    this.showModalMudarSenhaOnClick.hide();
    let senha = this.formulario.get('senhaatual').value;
    const novasenha = this.formulario.get('novasenha').value;
    const confirmanovasenha = this.formulario.get('confirmanovasenha').value;
    this.formulario.reset();
    let usuarioSenha = new Usuario();
    this.usuarioService.criptoSenha(senha).subscribe(
    resposta => {
       usuarioSenha = resposta as any;
       senha = usuarioSenha.senha;
       if (senha === this.usuario.senha) {
        if (novasenha === confirmanovasenha) {
          this.usuario.senha = novasenha;
          this.usuarioService.salvar(this.usuario).subscribe(
              resposta1 => {
                this.usuario = resposta1 as any;
                this.authService.setUsuario(this.usuario);
              },
              err1 => {
                console.log(err1.error.erros.join(' '));
              }
          );
      }
    }
    },
     err => {
      console.log(err.error.erros.join(' '));
      return '';
    }
    );
    
  }

  cancelarModalMudarSenha() {
    this.showModalMudarSenhaOnClick.hide();
    this.formulario.reset();
    this.usuarioService.getwinker().subscribe(
      resposta => {
        let retorno = resposta as any;
      },
      err1 => {
        console.log(err1.error.erros.join(' '));
       }
    );
  }

  abrirModalAlterarFoto() {
    this.showModalAlterarFotoOnClick.show();
  }

  onChange(event) {
    const selectedFiles = event.srcElement.files as FileList;
    this.file = selectedFiles[0];
    document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;
 }

 onUpload() {
  let filename = this.file.name;
  let nome = '';
  for (let i = filename.length - 1; i > 0; i--) {
    if (filename[i] !== '.' ) {
       nome = filename[i] + nome;
    } else {
      i = -100;
    }
  }
  const id = this.usuario.idusuario;
  filename = id.toString() + '.' + nome;
  this.usuarioService.upload(this.file, filename).subscribe(
      resposta => {
        const uri = resposta as any;
        this.usuario.urlfoto = 'https://pictureuser.s3.us-east-2.amazonaws.com/' + filename;
        this.usuarioService.update(this.usuario).subscribe(
         resposta1 => {
           this.usuario = resposta1 as any;
           this.showModalAlterarFotoOnClick.hide();
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

exportarSalutar() {
  this.funcionarioService.exportarSalutar().subscribe(
    reposta => {
      const uri = reposta as any;
      const url = 'https://tecseg-img.s3.us-east-2.amazonaws.com/Formulario+Funcionarios.xls';
      window.location.href = url;
      return url;
    },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  menuCadastro(menu: string) {
    let permitir = false;
      if (menu === 'clientes') {
        if (this.authService.getUsuario().acesso.clientes) {
          permitir = true;
          this.router.navigate(['/consclientes']);
        } 
      } else if (menu === 'funcionarios') {
        if (this.authService.getUsuario().acesso.funcionarios) {
          permitir = true;
          this.router.navigate(['/consfuncionario']);
        } 
      } else if (menu === 'funcao') {
        if (this.authService.getUsuario().acesso.funcao) {
          permitir = true;
          this.router.navigate(['/consfuncao']);
        } 
      } else if (menu === 'loja') {
        if (this.authService.getUsuario().acesso.loja) {
          permitir = true;
          //this.router.navigate(['/consfuncao']);
        } 
      } else if (menu === 'treinamento') {
        if (this.authService.getUsuario().acesso.treinamento) {
          permitir = true;
          this.router.navigate(['/constreinamentotipo']);
        } 
      } else if (menu === 'tipoexame') {
        if (this.authService.getUsuario().acesso.tipoexame) {
          permitir = true;
          //this.router.navigate(['/constreinamentotipo']);
        } 
      } else if (menu === 'acesso') {
        if (this.authService.getUsuario().acesso.acesso) {
          permitir = true;
          //this.router.navigate(['/constreinamentotipo']);
        } 
      } else if (menu === 'usuario') {
        if (this.authService.getUsuario().acesso.usuario) {
          permitir = true;
          //this.router.navigate(['/constreinamentotipo']);
        } 
      } else if (menu === 'produto') {
        if (this.authService.getUsuario().acesso.produto) {
          permitir = true;
          this.router.navigate(['/consproduto']);
        } 
      }else if (menu === 'produtogrupo') {
        if (this.authService.getUsuario().acesso.produtogrupo) {
          permitir = true;
          //this.router.navigate(['/consproduto']);
        } 
      }else if (menu === 'fornecedor') {
        if (this.authService.getUsuario().acesso.fornecedor) {
          permitir = true;
          this.router.navigate(['/consfornecedor']);
        } 
      }
      if (!permitir) {
        this.alertService.showAlertDanger("Acesso negado.");
      }
  }

  menuAso(menu: string) {
    let permitir = false;
      if (menu === 'agendamento') {
        if (this.authService.getUsuario().acesso.agendamento) {
          permitir = true;
          this.router.navigate(['/consasoagenda']);
        } 
      } else if (menu === 'controle') {
        if (this.authService.getUsuario().acesso.controle) {
          permitir = true;
          this.router.navigate(['/consasocontrole']);
        } 
      } else if (menu === 'relatorios') {
        if (this.authService.getUsuario().acesso.relatorios) {
          permitir = true;
         // this.router.navigate(['/consfuncao']);
        } 
      }
      if (!permitir) {
        this.alertService.showAlertDanger("Acesso negado.");
      }  
  }

  menuMovimento(menu: string) {
    let permitir = false;
      if (menu === 'afastamento') {
        if (this.authService.getUsuario().acesso.afastamento) {
          permitir = true;
          //this.router.navigate(['/consasoagenda']);
        } 
      } else if (menu === 'salutar') {
        if (this.authService.getUsuario().acesso.salutar) {
          permitir = true;
          this.router.navigate(['/conssalutar']);
        } 
      }  else if (menu === 'calculosalutar') {
        if (this.authService.getUsuario().acesso.calculosalutar) {
          permitir = true;
          this.router.navigate(['/pagsalutar']);
        } 
      } 
      if (!permitir) {
        this.alertService.showAlertDanger("Acesso negado.");
      }  
  }

  menuAcademia(menu: string) {
    let permitir = false;
      if (menu === 'turma') {
        if (this.authService.getUsuario().acesso.turma) {
          permitir = true;
          this.router.navigate(['/constreinamento']);
        } 
      } 
      if (!permitir) {
        this.alertService.showAlertDanger("Acesso negado.");
      }  
  }

  menuFinanceiro(menu: string) {
    let permitir = false;
      if (menu === 'cr') {
        if (this.authService.getUsuario().acesso.contas) {
          permitir = true;
          this.router.navigate(['/consreceber']);
        } 
      } 
      if (!permitir) {
        this.alertService.showAlertDanger("Acesso negado.");
      }  
  }

  menuEPI(menu: string) {
    let permitir = false;
      if (menu === 'epi') {
        if (this.authService.getUsuario().acesso.epi) {
          permitir = true;
          //this.router.navigate(['/constreinamento']);
        } 
      } else if (menu === 'uniformes') {
        if (this.authService.getUsuario().acesso.uniformes) {
          permitir = true;
          //this.router.navigate(['/constreinamento']);
        } 
      } else if (menu === 'epicontrole') {
        if (this.authService.getUsuario().acesso.epicontrole) {
          permitir = true;
          //this.router.navigate(['/constreinamento']);
        } 
      } else if (menu === 'epitipo') {
        if (this.authService.getUsuario().acesso.epitipo) {
          permitir = true;
          //this.router.navigate(['/constreinamento']);
        } 
      }else if (menu === 'epicompras') {
        if (this.authService.getUsuario().acesso.epicompras) {
          permitir = true;
          //this.router.navigate(['/constreinamento']);
        } 
      }
      if (!permitir) {
        this.alertService.showAlertDanger("Acesso negado.");
      }  
  }





}
