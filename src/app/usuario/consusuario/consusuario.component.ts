import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-consusuario',
  templateUrl: './consusuario.component.html',
  styleUrls: ['./consusuario.component.scss']
})
export class ConsusuarioComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario;
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
    });
    this.usuario = this.authService.getUsuario();
    this.consultar();
  }

  consultar() {
    this.usuarioService.listar().subscribe(
      resposta => {
        this.usuarios = resposta as any;
      }
    );
  }

  editar(usuario: Usuario) {
    this.usuarioService.setUsuario(usuario);
    this.router.navigate([ '/cadusuario']);
  }

  novo() {
    this.router.navigate([ '/cadusuario']);
  }

  pesquisar() {
    const nome = this.formulario.get('nome').value;
    this.usuarioService.buscarNome(nome).subscribe(
      resposta => {
        this.usuarios = resposta as any;
      }
    );
  }

}
