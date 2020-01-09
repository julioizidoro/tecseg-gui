import { Usuario } from 'src/app/usuario/model/usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { AlertModelService } from 'src/app/share/alert-model.service';




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
    private alertService: AlertModelService,
  ) { }

  getUsuario() {
    return this.usuario
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  fazerLogin(usuario: Usuario) {
    this.usuarioService.logar(usuario.login, usuario.senha).subscribe(
      resposta => {
        this.usuario = resposta as Usuario;
        if (this.usuario != null) {
          this.router.navigate(['/']);
          this.mostrarMenuEmitter.emit(true);
        } else {
          this.usuairoAutenticado = false;
          this.mostrarMenuEmitter.emit(false);
          this.handleError('Usário e/ou senha inválidos.', 'danger');
        }
      },
      err => {
        console.error(err);
        this.handleError('Usário e/ou senha inválidos.', 'danger');
      }
    );
  }

  fazerLogof() {
    this.usuario = null;
    this.usuairoAutenticado = false;
    this.mostrarMenuEmitter.emit(false);
  }

  handleError(msg: string, tipo: string) {
    if (tipo === 'danger') {
      this.alertService.showAlertDanger(msg);
    } else if (tipo === 'warning') {
      this.alertService.showAlertWarning(msg);
    } else if (tipo === 'success') {
      this.alertService.showAlertSuccess(msg);
    }
  }
}
