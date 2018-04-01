import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationsService } from './operations.service';
import { Operation } from './operation';

@Component({
  selector: 'cf-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  private title = 'Operation details';
  private _id: any;
  public operation: Operation;

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService
  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.operation = this.operationsService.getOperationById(this._id);
  }

}
