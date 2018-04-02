import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationsService } from './operations.service';
import { Operation } from './operation';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cf-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public title = 'Operation details';
  private _id: any;
  public operation: Operation;
  public message: String;
  public fullError: any;

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService
  ) { }

  ngOnInit() {
    // Con esto, solamente tendriamos los parametros  de la url cuando se ejecuta el ngOnInit
    this._id = this.getIdFromRoute();

    // Con esto, sin reiniciar el componente, cuando la url cambie, al estar suscrito,
    // nos enteraremos de los cambios en la url y tendremos los nuevos paramentrros
    this.route.params.subscribe( params => {
      this._id = params['id'];
      this.getDataById();
    });

  }

  private getIdFromRoute() {
    return this.route.snapshot.params['id'];
  }

  private getDataById() {
    this.operationsService
      .getOperationById$(this._id)
      .subscribe(this.showData.bind(this), this.catchError.bind(this));
  }

  private showData(operation: Operation) {
    this.operation = operation;
    this.message = `Operation: ${JSON.stringify(operation)}`;
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
