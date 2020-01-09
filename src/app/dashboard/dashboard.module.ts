import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { CardDashboardComponent } from './card/card-dashboard/card-dashboard.component';
import { CascadingPanelComponent } from './shared/components/cascading-panel/cascading-panel.component';
import { CascadingCardComponent } from './shared/components/cascading-card/cascading-card.component';
import { PanelComponent } from './shared/components/panel/panel.component';
import { OverlayCardComponent } from './shared/components/overlay-card/overlay-card.component';
import { ModalComponent } from './shared/components/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    CardDashboardComponent,
    CascadingPanelComponent,
    CascadingCardComponent,
    OverlayCardComponent,
    PanelComponent,
    ModalComponent,
  ],
  exports: [
    DashboardComponent,
    MDBBootstrapModule,
    CascadingPanelComponent,
    CascadingCardComponent,
    OverlayCardComponent,
    PanelComponent,
    ModalComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: []
})
export class DashboardModule {

}
