import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SobreNosotrosRoutingModule } from './sobre-nosotros-routing.module';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';

@NgModule({
  imports: [
    CommonModule,
    SobreNosotrosRoutingModule
  ],
  declarations: [SobreNosotrosComponent]
})
export class SobreNosotrosModule { }
