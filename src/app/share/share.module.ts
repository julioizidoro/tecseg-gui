import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConsultacepService } from './consultacep.service';



@NgModule({
  declarations: [ConfirmModalComponent, AlertModalComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertModalComponent],
  entryComponents: [AlertModalComponent, ConfirmModalComponent],
  providers:[ConsultacepService,]
})
export class ShareModule { }
