import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MessagesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('---> Starting middleware...');
    console.log(req.originalUrl);
    console.log(res.status);
    next();
  }
}
