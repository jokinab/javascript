import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {

  private started;

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const successCallback = this.interceptResponse.bind(this);
    const errorCallback = this.catchError.bind(this);
    const interceptionOperator = tap<HttpEvent<any>>(
      successCallback,
      errorCallback
    );
    this.started = Date.now();
    const handledRequest = next.handle(req);
    
    return handledRequest.pipe(interceptionOperator);
  }

  private interceptResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const elapsed_ms = Date.now() - this.started;
      console.log(`Request for ${event.url} took ${elapsed_ms} ms.`);
    }
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      console.log('Not authorized');
    } else {
      console.warn(err.statusText);
    }
  }

}
