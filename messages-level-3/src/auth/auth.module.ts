import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthUtil } from './auth.util';

@Module({
  imports: [UsersModule],
  providers: [AuthService, AuthUtil],
  exports: [AuthService, AuthUtil],
  controllers: [AuthController],
})
export class AuthModule {}
