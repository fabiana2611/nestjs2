import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthUtil } from './auth.util';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private authUtil: AuthUtil) {}

  test(email: string, password: string) {
    console.log('--> Start AuthService signin...');
    console.log(`email: ${email}, pwd: ${password}`);
  }

  async signup(email: string, password: string) {
    // see if email is in use
    const user = this.userService.find(email);

    if (user) {
      throw new BadRequestException('email in use');
    }

    const result = await this.authUtil.buildPassword(password);

    const newUser = this.userService.create(email, result);

    return newUser;
  }

  async signupV2(email: string, password: string) {
    // see if email is in use
    const user = this.userService.find(email);

    if (user) {
      throw new BadRequestException('email in use');
    }

    const result = await this.authUtil.buildPasswordV2(password);

    const newUser = this.userService.create(email, result);

    return newUser;
  }

  async signupV3(email: string, password: string) {
    // see if email is in use
    const user = this.userService.find(email);

    if (user) {
      throw new BadRequestException('email in use');
    }

    const result = await this.authUtil.buildPasswordV3(password);

    const newUser = this.userService.create(email, result);

    return newUser;
  }

  async signin(email: string, password: string) {
    const user = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPwdValid = this.authUtil.isPwdValid(password, user.password);

    if (!isPwdValid) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }

  async signinV2(email: string, password: string) {
    const user = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPwdValid = this.authUtil.isPwdValidV2(password, user.password);

    if (!isPwdValid) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }

  async signinV3(email: string, password: string) {
    const user = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPwdValid = this.authUtil.isPwdValidV3(password, user.password);

    if (!isPwdValid) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }
}
