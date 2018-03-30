import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { Error404Component } from './views/error404/error404.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'sobre-nosotros',
    loadChildren: './views/sobre-nosotros/sobre-nosotros.module#SobreNosotrosModule'
  },
  {
    path: 'mapa',
    loadChildren: './views/mapa/mapa.module#MapaModule'
  },
  {
    path: 'productos',
    loadChildren: './views/productos/productos.module#ProductosModule'
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
