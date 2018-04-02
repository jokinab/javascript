import { Component, OnInit } from '@angular/core';
import { Operation } from './operation';
import { OperationsService } from './operations.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  public message: String;
  public fullError: any;

  constructor(private operationsService: OperationsService) {}

  ngOnInit() {
    this.refreshData();
  }

  public saveOperation(operation: Operation) {
    this.operationsService
      .saveOperation$(operation)
      .subscribe(data => this.refreshData(), this.catchError.bind(this));
  }

  public deleteOperation(operation: Operation) {
    this.operationsService
      .deleteOperation$(operation)
      .subscribe(data => this.refreshData(), this.catchError.bind(this));
    this.refreshData();
  }

  private refreshData() {
    this.message = 'Refreshing Data';
    this.fullError = null;
    this.operationsService
      .getOperationsList$()
      .subscribe(this.showOperations.bind(this), this.catchError.bind(this));
    this.operationsService
      .getNumberOfOperations$()
      .subscribe(this.showCount.bind(this), this.catchError.bind(this));
  }

  private showOperations(operations: Operation[]) {
    this.operations = operations;
    this.message = 'Operations OK';
  }

  private showCount(data: any) {
    this.numberOfOperations = data.count;
    this.message = 'Count OK';
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.message = `Http Error: ${err.status}, text: ${err.statusText}`;
    } else {
      this.message = `Unknown error, text: ${err.message}`;
    }
    this.fullError = err;
  }

}
