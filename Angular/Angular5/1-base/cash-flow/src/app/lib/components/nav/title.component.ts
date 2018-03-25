import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cf-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  title: String = 'Navegacion';
  constructor() { }

  ngOnInit() {
  }

}
