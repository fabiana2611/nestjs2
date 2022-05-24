import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserOld } from './user-old.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserOld], 'OldConnection'),
  ],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
