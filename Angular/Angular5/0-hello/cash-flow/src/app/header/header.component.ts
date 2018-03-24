import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ca-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario = 'Jokin';

  constructor() { }

  ngOnInit() {
  }

}
