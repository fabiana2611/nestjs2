import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesMiddleware } from './middleware/messages.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [MessagesService, MessagesRepository],
  /**
   *   Study Notes:
   *   using middleware insted of interceptor because of the order of execution
   *   // Global Scope
   *   { provide: APP_INTERCEPTOR,  useClass: CurrentUserInterceptor  }
   */
  controllers: [MessagesController],
})
export class MessagesModule {
  // Middleware run after Cookie-Session Middleware and before AdminGuard
  configure(consumer: MiddlewareConsumer) {
    console.log('---> Starting Messages Module...');
    consumer.apply(MessagesMiddleware).forRoutes('*');
  }
}
