import { Module } from '@nestjs/common';
import { UserModel } from './user.model';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UserOldModel } from './user-old.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    SequelizeModule.forFeature([UserOldModel], 'OldConnection'),
  ],
  providers: [UsersService],
  exports: [SequelizeModule],
  controllers: [UsersController],
})
export class UsersModule {}
