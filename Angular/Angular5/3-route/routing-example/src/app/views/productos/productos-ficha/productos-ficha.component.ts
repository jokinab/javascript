import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jab-productos-ficha',
  templateUrl: './productos-ficha.component.html',
  styleUrls: ['./productos-ficha.component.css']
})
export class ProductosFichaComponent implements OnInit {

  id: any;

  constructor( private ruta: ActivatedRoute ) { }

  ngOnInit() {
    this.id = this.ruta.snapshot.params['id'];
  }

}
