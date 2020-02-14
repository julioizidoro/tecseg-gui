import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/clientes/model/clientes';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes/clientes.service';

@Component({
  selector: 'app-consfornecedor',
  templateUrl: './consfornecedor.component.html',
  styleUrls: ['./consfornecedor.component.scss']
})
export class ConsfornecedorComponent implements OnInit {

  clientes: Clientes[];
    formulario: FormGroup;
    isFirstOpen = false;
    oneAtATime: true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientesService: ClientesService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
    });
    this.consultar();
  }

  consultar() {
    this.clientesService.listar('f').subscribe(
      resposta => {
        this.clientes = resposta as any;
      }
    );
  }

  pesquisar() {
    let nome = this.formulario.get('nome').value;
    if (nome == null) {
      nome = '@';
    }
    let email = '@';
    if (email == null) {
      email = '@';
    }
    this.clientesService.pesquisar(nome, email, 'f').subscribe(
     resposta => {
       this.clientes = resposta as any;
     }
   );
 }


 editar(cliente: Clientes) {
    this.clientesService.setCliente(cliente);
    this.router.navigate(['/cadfornecedor']);
 }

}
