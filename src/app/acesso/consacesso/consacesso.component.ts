import { Component, OnInit } from '@angular/core';
import { AcessoService } from '../acesso.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Acesso } from '../model/acesso';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consacesso',
  templateUrl: './consacesso.component.html',
  styleUrls: ['./consacesso.component.scss']
})
export class ConsacessoComponent implements OnInit {

  acessos: Acesso[];
  usuario: Usuario;

  constructor(
    private router: Router,
    private authService: AuthService,
    private acessoService: AcessoService,
  ) { }

  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.consultar();
  }

  consultar() {
    this.acessoService.listar().subscribe(
      resposta => {
        this.acessos = resposta as any;
      }
    );
  }

  editar(acesso: Acesso) {
    this.acessoService.setAcesso(acesso);
    this.router.navigate([ '/cadacesso']);
  }
}
