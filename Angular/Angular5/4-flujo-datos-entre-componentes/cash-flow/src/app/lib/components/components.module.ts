import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TitleComponent } from './nav/title.component';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavComponent, FooterComponent, TitleComponent],
  exports: [NavComponent, FooterComponent, TitleComponent]
})
export class ComponentsModule { }
