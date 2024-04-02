import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  uusario: Usuario;

  idusuario: number;
  nome: string;
  fonecelular: string;
  user: string;
  password: string;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      idusuario: [null],
      nome: [null],
      nascimento: [null],
      login: [null],
      senha: [null],
      sexo: [null],
      email: [null],
      fonecelular: [null],
      situacao: [null],
      acesso: [null],
      urlfoto: [null],
      urlassinatura: [null],
      registromte: [null],
      funcao: [null],
    });

  }

  logar() {
    this.uusario = this.formulario.value;
    this.authService.fazerLogin(this.uusario);
  }
}
