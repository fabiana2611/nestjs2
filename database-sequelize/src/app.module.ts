import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users/user.model';
import { UserOldModel } from './users/user-old.model';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'postgres',
      synchronize: true,
      models: [UserModel],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '',
      database: 'postgres',
      models: [UserOldModel],
      synchronize: true,
      name: 'OldConnection',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
