import { Component } from '@angular/core';
import { Usuario } from './usuario/model/usuario';
import { AuthService } from './usuario/login/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tecseg-gui';
  logado = false;

  usuario: Usuario;
  specialPage: boolean;

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.usuario = new Usuario();
    if (this.logado === false) {
      this.router.navigate(['/login']);
    }
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.logado = mostrar
    );
    if (this.logado === true) {
      this.usuario = this.authService.usuario;
    }
  }

  goBack(): void {
    this.location.back();
  }
}


