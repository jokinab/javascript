import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';

import { OperationsComponent } from './operations.component';
import { ListComponent } from './list.component';
import { ItemComponent } from './item.component';


@NgModule({
  imports: [
    CommonModule,
    OperationsRoutingModule
  ],
  declarations: [OperationsComponent, ListComponent, ItemComponent]
})
export class OperationsModule { }
