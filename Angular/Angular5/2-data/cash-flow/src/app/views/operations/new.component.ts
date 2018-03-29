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
  public kindsOfOperations = ['Income', 'Expense'];

  public operations: Operation[] = [];
  public numberOfOperation: Number = 0;

  constructor() { }

  ngOnInit() { }

  saveOperation() {

    const clonedOperation: Operation = this.cloneOperation(this.operation);
    clonedOperation._id = new Date().getTime().toString();
    this.operations.push(clonedOperation);

    this.numberOfOperation = this.operations.length;

    this.operation = new Operation();

    console.log('Current List: ', this.operations);

  }

  deleteOperation(operation: Operation) {
    const index = this.operations.indexOf(operation);
    this.operations.splice(index, 1);
    this.numberOfOperation = this.operations.length;
  }

  cloneOperation(operation: Operation): Operation {
    const targetOperation: Operation = Object.assign ({}, operation);
    return targetOperation;
  }

}
