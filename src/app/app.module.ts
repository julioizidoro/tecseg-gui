import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule, IconsModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcessoModule } from './acesso/acesso.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { AsocontroleModule } from './asocontrole/asocontrole.module';
import { AsoagendaModule } from './asoagenda/asoagenda.module';
import { ClinicaModule } from './clinica/clinica.module';
import { registerLocaleData } from '@angular/common';
import br from '@angular/common/locales/br';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { TreinamentoModule } from './treinamento/treinamento.module';
import { routing } from 'src/app.routing';
import { AuthService } from './usuario/login/auth.service';
import { HttpClientModule } from '@angular/common/http';



registerLocaleData(br, 'pt-BR');


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    IconsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    RouterModule,
    AppRoutingModule,
    TextMaskModule,
    BrowserAnimationsModule,
    NavigationModule,
    DashboardModule,
    UsuarioModule,
    AcessoModule,
    FuncionarioModule,
    ClinicaModule,
    TreinamentoModule,
    AsoagendaModule,
    AsocontroleModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AuthService,
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
