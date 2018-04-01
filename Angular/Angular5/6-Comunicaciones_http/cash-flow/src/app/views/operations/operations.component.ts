import { Component, OnInit } from '@angular/core';
import { Operation } from './operation';
import { OperationsService } from './operations.service';

@Component({
  selector: 'cf-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  public title: String = 'Operations Component';
  public kindsOfOperations = ['Income', 'Expense'];
  public numberOfOperations = 0;
  public operations: Operation[] = [];

  constructor(private operationsService: OperationsService) {}

  ngOnInit() {
    this.refreshData();
  }

  public saveOperation(operation: Operation) {
    this.operationsService.saveOperation(operation);
    this.refreshData();
  }

  public deleteOperation(operation: Operation) {
    this.operationsService.deleteOperation(operation);
    this.refreshData();
  }

  private refreshData() {
    this.numberOfOperations = this.operationsService.getNumberOfOperations();
    this.operations = this.operationsService.getOperationsList();
  }

}
