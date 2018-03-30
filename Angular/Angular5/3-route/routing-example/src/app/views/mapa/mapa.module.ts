import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes, RouterLink } from '@angular/router';

import { MapaComponent } from './mapa/mapa.component';
import { MapaMadridComponent } from './mapa-madrid/mapa-madrid.component';

const routes: Routes = [
  {
    path: '',
    component: MapaComponent
  },
  {
    path: 'madrid',
    component: MapaMadridComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapaComponent, MapaMadridComponent ]
})
export class MapaModule { }
