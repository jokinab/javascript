import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { Operation } from './operation';

@Component({
  selector: 'cf-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  title = 'List Of Operations';

  @Input() public numberOfOperations: Number = 0;
  @Input() public operations: Operation[] = [];
  @Output() public delete = new EventEmitter<Operation>();

  public deleteOperation(operation: Operation) {
    this.delete.emit(operation);
  }

  constructor() { }

  ngOnInit() {
  }

}
