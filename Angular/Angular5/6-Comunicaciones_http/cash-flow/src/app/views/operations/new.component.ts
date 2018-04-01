import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Operation } from './operation';


@Component({
  selector: 'cf-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @Input() public kindsOfOperations: String[] = [];
  @Input() public numberOfOperations = 0;
  @Output() public save = new EventEmitter<Operation>();

  public title = 'New Operation';
  public operation: Operation = new Operation();

  constructor() { }

  ngOnInit() { }

  public saveOperation() {
    this.save.emit(this.operation);
    this.operation = new Operation();
  }

}
