import { Component, OnInit } from '@angular/core';
import { Operation } from './operation';

@Component({
  selector: 'cf-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  public numberOfOperations: Number = 0;
  public operations: Operation[] = [];
  public title: String = 'Operations Component';
  public kindsOfOperations = ['Income', 'Expense'];

  constructor() { }

  ngOnInit() { }

  public saveOperation(operation: Operation) {
    operation._id = new Date().getTime().toString();
    this.operations = [...this.operations, operation];
    this.numberOfOperations = this.operations.length;
    console.log(this.operations);
  }

  public deleteOperation(operation: Operation) {
    const index = this.operations.indexOf(operation);
    this.operations.splice(index, 1);
    this.numberOfOperations = this.operations.length;
  }

}
