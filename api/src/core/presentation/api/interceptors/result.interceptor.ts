// src/interceptors/result.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // Adjust the import path according to your project structure
import { Result } from '../../../domain/abstractions/result';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        const data = value.data ?? value;
        if (data instanceof Result) {
          // This checks for Result and ResultWithValue due to inheritance
          if (data.isSuccess) {
            // If success, return the value and additional success meta data
            return {
              message: value.message ? value.message : 'Success',
              data: data.value, // This will handle the value from ResultWithValue as well
              meta: value.meta,
            };
          } else {
            // If failure, throw an HttpException with the errors formatted
            throw new HttpException(
              {
                message: value.message ? value.message : 'Request failed',
                errors: data.getErrors().map((err) => ({
                  code: err.code,
                  description: err.description,
                })),
                meta: value.meta,
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        }
        // If the result is not an instance of Result class, pass it through unchanged.
        return data;
      }),
      catchError((error) => throwError(() => error)),
    );
  }
}
