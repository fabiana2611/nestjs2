import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentMessage = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log('--> Starting Decorator...');
    request.message = 'Hello Big World!';
    return request.message;
  },
);
