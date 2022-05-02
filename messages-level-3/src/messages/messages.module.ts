import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesMiddleware } from './middleware/messages.middleware';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    AuthModule,
    ConfigModule.register({ attribute: 'staging' }),
    ThrottlerModule.forRoot({
      //time to live
      ttl: 60,
      // the maximum number of requests within the ttl, for the routes of your application that are guarded
      limit: 10,
    }),
  ],
  providers: [
    MessagesService,
    MessagesRepository,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
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
