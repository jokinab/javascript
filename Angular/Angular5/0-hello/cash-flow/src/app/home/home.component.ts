import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ca-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  interpolacion: String = 'Texto interpolado';
  url: String = 'https://www.google.com';
  activo: Boolean = false;

  interpolarOtraCosa() {
    this.interpolacion = 'Nuevo texto Interpolado';
  }

  intercambiar() {
    this.activo = !this.activo;
  }

  constructor() { }

  ngOnInit() {
  }

}
