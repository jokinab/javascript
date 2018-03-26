import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'cf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  now = moment().format();
  tomorrow = moment().add(1, 'days').format();

  constructor() { }

  ngOnInit() {
  }

}
