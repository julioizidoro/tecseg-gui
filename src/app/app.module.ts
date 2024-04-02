import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule, IconsModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, DatePipe } from '@angular/common';
import br from '@angular/common/locales/br';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { AuthService } from './usuario/login/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap';
import { routing } from './app.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShareModule } from './share/share.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DashboardModule } from './dashboard/dashboard.module';




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
    AccordionModule.forRoot(),
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
    ModalModule.forRoot(),
    ShareModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AuthService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
