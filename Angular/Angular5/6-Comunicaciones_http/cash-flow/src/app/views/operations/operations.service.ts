import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Operation } from './operation';

@Injectable()
export class OperationsService {

  private operations: Operation[] = [];
  private url = environment.apiUrl + 'pub/items/';

  constructor(private http: HttpClient ) {}

  public getNumberOfOperations$(): any {
    return this.http.get(this.url + 'count');
  }

  public getOperationsList$(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.url);
  }

  public getOperationById$(id: String): Observable<Operation> {
    return this.http.get<Operation>(this.url + id);
  }

  public saveOperation$(operation: Operation): Observable<any> {
    return this.http.post(this.url, operation);
  }

  public deleteOperation$(operation: Operation): Observable<any> {
    return this.http.delete(this.url + operation._id);
  }

}
