import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthUtil } from './auth.util';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './JwtStrategy';
import { LocalStrategy } from './local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    AuthUtil,
    JwtStrategy,
    LocalStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AuthService, AuthUtil, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
