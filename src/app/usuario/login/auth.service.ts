import { Usuario } from 'src/app/usuario/model/usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';




@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private usuairoAutenticado = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  private usuario: Usuario;
  senhaCripto: string;


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

    getUsuario() {
      return this.usuario
    }

    setUsuario(usuario: Usuario){
      this.usuario = usuario;
    }

    fazerLogin(usuario: Usuario) {
      this.usuarioService.logar(usuario.login, usuario.senha).subscribe(
        resposta => {
          this.usuario = resposta as Usuario;
          if ( this.usuario != null ) {
            this.router.navigate([ '/' ]);
            this.mostrarMenuEmitter.emit(true);
          } else {
            this.usuairoAutenticado = false;
            this.mostrarMenuEmitter.emit(false);
          }
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      );
    }

    fazerLogof() {
      this.usuario = null;
      this.usuairoAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }
}
