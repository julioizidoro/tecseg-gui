import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';



@NgModule({
  declarations: [ConfirmModalComponent, AlertModalComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertModalComponent],
  entryComponents: [AlertModalComponent, ConfirmModalComponent],
})
export class ShareModule { }
