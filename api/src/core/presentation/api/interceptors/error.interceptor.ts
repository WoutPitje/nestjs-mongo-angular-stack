// src/interceptors/error.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResultInterceptor } from './result.interceptor';
import { TransformResponseInterceptor } from './transform.interceptor';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
    return next.handle().pipe(
      catchError(error => {
        // If the error is not an HttpException, wrap it in an HttpException.
        if (!(error instanceof HttpException)) {
          error = new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const response = error.getResponse();
        const errorMessage = error.message;
        const errorStatus = error.getStatus();

        // Determine error format based on whether the response is an object or a simple message
        const errors = (response instanceof Object && response.message) ?
          [{ code: "", description: response.message }] :
          [{ code: "", description: errorMessage }];

        return throwError(() => new HttpException({
          message: "An error occurred",
          data: null,
          meta: {},
          errors: errors,
        }, errorStatus));
      })
    );
  }
}
