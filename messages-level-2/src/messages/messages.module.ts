import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesMiddleware } from './middleware/messages.middleware';

@Module({
  providers: [MessagesService, MessagesRepository],
  controllers: [MessagesController],
})
export class MessagesModule {
  // Middleware run after Cookie-Session Middleware and before AdminGuard
  configure(consumer: MiddlewareConsumer) {
    console.log('---> Starting Messages Module...');
    consumer.apply(MessagesMiddleware).forRoutes('*');
  }
}
