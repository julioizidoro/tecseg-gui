import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Clientes } from '../model/clientes';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-conscliente',
  templateUrl: './conscliente.component.html',
  styleUrls: ['./conscliente.component.scss']
})
export class ConsclienteComponent implements OnInit {

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
    this.clientesService.listar('c').subscribe(
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
    if (nome == null) {
      nome = '@';
    }
    this.clientesService.pesquisar(nome, email, 'c').subscribe(
     resposta => {
       this.clientes = resposta as any;
     }
   );
 }


 editar(cliente: Clientes) {
    this.clientesService.setCliente(cliente);
    this.router.navigate(['/cadclientes']);
 }

 selecionarCliente(clienteSelecionado: Clientes) {
  if (this.clientesService.sgetRota() === 'contasr') {
      this.clientesService.setRota(null);
      this.clientesService.setCliente(clienteSelecionado);
      this.router.navigate(['/cadreceber']);
      console.log('parar');
  } 
}

}
