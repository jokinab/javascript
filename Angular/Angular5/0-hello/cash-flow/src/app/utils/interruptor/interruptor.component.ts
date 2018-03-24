import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ca-interruptor',
  templateUrl: './interruptor.component.html',
  styleUrls: ['./interruptor.component.css']
})
export class InterruptorComponent implements OnInit {

  activo = true;

  intercambiar() {
    this.activo = !this.activo;
  }

  constructor() { }

  ngOnInit() {
  }

}
