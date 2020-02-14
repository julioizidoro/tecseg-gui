import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/clientes/model/clientes';
import { Cep } from 'src/app/share/model/cep';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/usuario/model/usuario';
import { ConsultacepService } from 'src/app/share/consultacep.service';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-cadfornecedor',
  templateUrl: './cadfornecedor.component.html',
  styleUrls: ['./cadfornecedor.component.scss']
})
export class CadfornecedorComponent implements OnInit {

  formulario: FormGroup;
  cep: Cep;
  cliente: Clientes;
  pessoaJuridica = false;
  pessoaFisica = false;
  segundo = false;
  isFirstOpen = true;
  oneAtATime: true;
  public maskCPF = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  // tslint:disable-next-line:max-line-length
  public maskCNPJ = [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public maskFONE = ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  // tslint:disable-next-line:max-line-length
  public maskCELULAR = ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public maskCEP = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/];
  usuario: Usuario;
  

  constructor(
    private consultacepService: ConsultacepService,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private router: Router,
    private activeRrouter: ActivatedRoute,
    private authService: AuthService,
  ) { }



  ngOnInit() {
    this.usuario = this.authService.getUsuario();
    this.cliente = this.clientesService.getCliente();
    if (this.cliente != null) {
      if (this.cliente.tipojuridico === 'PF') {
        this.pessoaFisica = true;
        this.pessoaJuridica = false;
      } else {
        this.pessoaJuridica = true;
        this.pessoaFisica = false;
      }
      this.formulario = this.formBuilder.group({
        idclientes: this.cliente.idclientes,
        nome: this.cliente.nome,
        cpf: this.cliente.cpf,
        tipojuridico: this.cliente.tipojuridico,
        datanascimento: this.cliente.datanascimento,
        logradouro: this.cliente.logradouro,
        numero: this.cliente.numero,
        complemento: this.cliente.complemento,
        bairro: this.cliente.bairro,
        cidade: this.cliente.cidade,
        estado: this.cliente.estado,
        cep: this.cliente.cep,
        fonecelular: this.cliente.fonecelular,
        fonefixo: this.cliente.fonefixo,
        codigosysmo: this.cliente.codigosysmo,
        email: this.cliente.email,
        contato: this.cliente.contato,
        tipo: this.cliente.tipo,
      });
    } else {
      this.setFormularioNulo();
      this.cliente = new Clientes();
    }
  }


consultarCEP() {
  let cepInformado = this.formulario.get('cep').value;

  cepInformado = cepInformado.replace(/\D/g, '');
  this.consultacepService.consultar(cepInformado).subscribe(
    resposta => {
      this.cep = resposta;
        this.formulario.patchValue({
            logradouro: this.cep.logradouro,
            bairro: this.cep.bairro,
            cidade: this.cep.localidade,
            estado: this.cep.uf
        });
    },
    err => {
      console.log(JSON.stringify(err));
    }
  );
}


setTipoJuridico() {
  if (this.formulario.get('tipojuridico').value === 'PF') {
    this.pessoaJuridica = false;
    this.pessoaFisica = true;
  } else {
    this.pessoaJuridica = true;
    this.pessoaFisica = false;
  }
}



salvar() {
  this.cliente = this.formulario.value;
  this.cliente.tipo = 'f';
  this.clientesService.salvar(this.cliente).subscribe(
    resposta => {
      this.cliente = resposta as any;
      this.clientesService.setCliente(null);
      this.router.navigate(['/consfornecedor']);
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
  );
}

cancelar() {
  this.formulario.reset();
  this.clientesService.setCliente(null);
  this.router.navigate(['/consfornecedor']);
}

setFormularioNulo() {
  this.formulario = this.formBuilder.group({
    idclientes: [null],
    nome: [null],
    cpf: [null],
    tipjuridico: [null],
    datanascimento: [null],
    logradouro: [null],
    numero: [null],
    complemento: [null],
    bairro: [null],
    cidade: [null],
    estado: [null],
    cep: [null],
    fonecelular: [null],
    fonefixo: [null],
    codigosysmo: [null],
    email: [null],
    contato: [null],
    tipo: [null],
  });
}


}
