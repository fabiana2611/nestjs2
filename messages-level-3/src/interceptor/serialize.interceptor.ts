import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  // make method reusable
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('--> Starting my SerializeInterceptor ...');
    return next.handle().pipe(
      map((data: any) => {
        console.log('I am running before response is sent out', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: false,
        });
      }),
    );
  }
}
