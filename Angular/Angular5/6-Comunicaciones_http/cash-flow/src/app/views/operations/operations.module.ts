// ----- Modulos a importar ------ //
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modulo para uso de formularios
import { FormsModule } from '@angular/forms';
// Modulo de routing
import { OperationsRoutingModule } from './operations-routing.module';

// ----- Componentes a declarar ----- //

// Componentes del modulo
import { OperationsComponent } from './operations.component';
import { ListComponent } from './list.component';
import { ItemComponent } from './item.component';
import { NewComponent } from './new.component';

// ----- Servicios Inyectables ----- //

// Servicios del propio modulo
import { OperationsService } from './operations.service';
// Comunicaciones Http
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [ CommonModule, OperationsRoutingModule, FormsModule, HttpClientModule],
  declarations: [OperationsComponent, ListComponent, ItemComponent, NewComponent],
  providers: [OperationsService, HttpClientModule]
})
export class OperationsModule { }
