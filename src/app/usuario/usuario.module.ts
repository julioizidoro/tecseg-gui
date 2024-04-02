import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { TextMaskModule } from 'angular2-text-mask';
import {DropdownModule} from 'primeng/dropdown';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { AuthService } from './login/auth.service';
import { AccordionModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TextMaskModule,
    AccordionModule.forRoot(),
  ],
  exports:[LoginComponent], 
  providers:[
    UsuarioService, 
    AuthService,
  ],
  
})
export class UsuarioModule { }
