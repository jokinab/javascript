import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterruptorComponent } from './interruptor/interruptor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InterruptorComponent],
  exports: [InterruptorComponent]
})
export class UtilsModule { }
