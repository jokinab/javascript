import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, ContactoComponent],
  exports: [HomeComponent, ContactoComponent]
})
export class ViewsModule { }
