import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, ContactoComponent, Error404Component],
  exports: [HomeComponent, ContactoComponent, Error404Component]
})
export class ViewsModule { }
