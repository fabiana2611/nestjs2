import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserHttpModule } from './user-http/user-http.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOld } from './users/user-old.entity';

@Module({
  imports: [
    UsersModule,
    UserHttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'postgres',
      synchronize: true,
      host: 'localhost',
      entities: [User],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5433,
      username: 'postgres',
      password: '',
      database: 'postgres',
      synchronize: true,
      name: 'OldConnection',
      host: 'localhost',
      entities: [UserOld],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
