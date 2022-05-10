import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthUtil } from './auth.util';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private authUtil: AuthUtil,
              private jwtService: JwtService) {
  }

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

  //https://docs.nestjs.com/security/authentication#jwt-functionality
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Reference: https://docs.nestjs.com/security/authentication#implementing-passport-strategies
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
