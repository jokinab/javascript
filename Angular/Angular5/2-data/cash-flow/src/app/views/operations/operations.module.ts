import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { OperationsRoutingModule } from './operations-routing.module';

import { OperationsComponent } from './operations.component';
import { ListComponent } from './list.component';
import { ItemComponent } from './item.component';
import { NewComponent } from './new.component';


@NgModule({
  imports: [
    CommonModule,
    OperationsRoutingModule,
    FormsModule
  ],
  declarations: [OperationsComponent, ListComponent, ItemComponent, NewComponent]
})
export class OperationsModule { }
