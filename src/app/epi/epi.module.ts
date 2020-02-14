import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadepiComponent } from './cadastro/cadepi/cadepi.component';
import { ConsepiComponent } from './cadastro/consepi/consepi.component';



@NgModule({
  declarations: [CadepiComponent, ConsepiComponent],
  imports: [
    CommonModule
  ]
})
export class EpiModule { }
