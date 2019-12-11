import { Component, OnInit, ViewChild } from '@angular/core';
import { Acesso } from 'src/app/acesso/model/acesso';
import { Usuario } from '../model/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { AuthService } from '../login/auth.service';
import { AcessoService } from 'src/app/acesso/acesso.service';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-cadusuario',
  templateUrl: './cadusuario.component.html',
  styleUrls: ['./cadusuario.component.scss']
})
export class CadusuarioComponent implements OnInit {

  formulario: FormGroup;
    usuarioLogado: Usuario;
    usuario: Usuario;
    login: string;
    senha: string;
    acessoSelecionado: Acesso;
    acessos: Acesso[];
    public maskCELULAR = ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
    @ViewChild('novasenha', null) public showModalNovaSenhaOnClick: ModalDirective;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private acessoService: AcessoService,
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.authService.usuario;
    const usuario = this.usuarioService.getUsuario();
    this.listarAcesso();
    if (usuario != null) {
      this.usuario = new Usuario();
      this.usuario.login = '';
      this.usuario.senha = '';
      this.formulario = this.formBuilder.group({
        idusuario: usuario.idusuario,
        nome: usuario.nome,
        datanascimento: usuario.datanascimento,
        login: usuario.login,
        senha: usuario.senha,
        email: usuario.email,
        fonecelular: usuario.fonecelular,
        situacao: usuario.situacao,
        acesso: usuario.acesso,
      });
      this.acessoSelecionado = usuario.acesso;
    } else {
      this.acessoSelecionado = new Acesso();
      this.acessoSelecionado.nome = '';
      this.formulario = this.formBuilder.group({
        idusuario: [null],
        nome: [null],
        datanascimento: [null],
        login: [null],
        senha: [null],
        email: [null],
        fonecelular: [null],
        situacao: ['Ativo'],
        acesso: this.acessoSelecionado
      });
    }
  }

  listarAcesso() {
      this.acessoService.listar().subscribe(
        resposta => {
          this.acessos = resposta as any;
        }
      );
  }

  salvar() {
    let novo = false;
    this.usuario = this.formulario.value;
    if (this.usuario.idusuario == null) {
      this.usuario.senha = this.gerarSenha();
      novo = true;
      this.usuarioService.salvar( this.usuario).subscribe(
        resposta => {
          this.usuario = resposta as any;
          this.login = this.usuario.login;
          this.senha = this.usuario.senha;
          this.showModalNovaSenhaOnClick.show();
        }
      );
    } else {
      this.usuarioService.update( this.usuario).subscribe(
        resposta => {
          this.usuario = resposta as any;
          this.cancelar();
        }
      );
    }
  }

  cancelar() {
    this.formulario.reset();
    this.router.navigate(['/consusuario']);
  }


  gerarSenha() {
    let senha = this.usuario.nome.substring(1, 4);
    senha = senha + this.usuario.nome.substring((this.usuario.nome.length - 3), 3);
    return senha;
  }

  fecharModal() {
    this.showModalNovaSenhaOnClick.hide();
    this.router.navigate(['/consusuairo']);
  }

  compararAcesso(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setAcesso() {
    this.acessoSelecionado = this.formulario.get('acesso').value;
  }
}

