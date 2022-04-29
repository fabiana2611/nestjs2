import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

// Interceptors run after guards. If you need run befor the guards you need to create middleware

@Injectable()
export class MessagesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler<any>) {
    console.log('--> Starting interceptor...');
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || 'Test';

    return handler.handle();
  }
}
