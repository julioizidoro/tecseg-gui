import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadusuarioComponent } from './cadusuario/cadusuario.component';
import { ConsusuarioComponent } from './consusuario/consusuario.component';
import { LoginComponent } from './login/login.component';
import { TextMaskModule } from 'angular2-text-mask';
import {DropdownModule} from 'primeng/dropdown';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { AuthService } from './login/auth.service';


@NgModule({
  declarations: [CadusuarioComponent, ConsusuarioComponent, LoginComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TextMaskModule,
  ],
  exports:[CadusuarioComponent, ConsusuarioComponent, LoginComponent], 
  providers:[
    UsuarioService, 
    AuthService,
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class UsuarioModule { }
