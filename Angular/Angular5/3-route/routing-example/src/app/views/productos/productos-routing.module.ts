import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosHomeComponent } from './productos-home/productos-home.component';
import { ProductosFichaComponent } from './productos-ficha/productos-ficha.component';
import { ProductosComponent } from './productos.component';


const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    children: [
      {
        path: ':id',
        component: ProductosFichaComponent
      },
      {
        path: '',
        component: ProductosHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
