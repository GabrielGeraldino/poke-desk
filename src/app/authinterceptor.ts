import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiKey = environment.apiKey;

    const authReq = req.clone({
      setHeaders: {
        'X-Api-Key': apiKey,
      },
    });

    return next.handle(authReq).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
