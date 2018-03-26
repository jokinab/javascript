import { Component, OnInit } from '@angular/core';

import { Operation } from './operation';

@Component({
  selector: 'cf-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public title: String = 'New Item on Cash Flow';
  public operation: Operation = new Operation();

  constructor() { }

  ngOnInit() { }

  saveOperation() {}

}
