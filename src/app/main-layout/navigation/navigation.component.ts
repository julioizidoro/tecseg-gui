import { UsuarioService } from './../../usuario/usuario.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';


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

  @ViewChild('mudarsenha', null) public showModalMudarSenhaOnClick: ModalDirective;
  @ViewChild('alterarfoto', null) public showModalAlterarFotoOnClick: ModalDirective;

  constructor(
      private authService: AuthService,
      private router: Router,
      private formBuilder: FormBuilder,
      private usuarioService: UsuarioService,
  ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.setFormulario();
    this.usuario = this.authService.usuario;
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
                this.authService.usuario = this.usuario;
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
  }

  abrirModalAlterarFoto() {
    this.showModalAlterarFotoOnClick.show();
  }

  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    this.file = selectedFiles[0];
    document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;
 }

 onUpload() {
   let fileName = this.file.name;
   let nome = '';
   for (let i = fileName.length - 1; i > 0; i--) {
     if (fileName[i] !== '.' ) {
        nome = fileName[i] + nome;
     } else {
       i = -100;
     }
   }
   const id = this.usuario.idusuario;
   fileName = id.toString() + '.' + nome;
    this.usuarioService.upload(this.file, fileName).subscribe(
       resposta => {
         const uri = resposta as any;
         this.usuario.urlfoto = 'https://pictureuser.s3.us-east-2.amazonaws.com/' + fileName;
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

}
