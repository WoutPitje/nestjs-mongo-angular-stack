// src/interceptors/transform-response.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(value => ({
        message: value.message ?? 'Success',  // Ensure that value exists
        data: value.data ?? value,            // Default to value if data is not present
        meta: {
          timestamp: new Date().toISOString(),
          path: context.switchToHttp().getRequest().url,
          ...value.meta       // Ensure meta exists before spreading
        }
      }))
    );
  }
}
