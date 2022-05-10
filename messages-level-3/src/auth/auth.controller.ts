import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Session,
  UseGuards,
  Request as NestRequest,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { Public } from "../config/public.decorator";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // #1
  @Get('/chats')
  async getChat(@Session() session: any) {
    return session.chat;
  }

  @Get('/chats/:chat')
  async setChat(@Param('chat') chat: string, @Session() session: any) {
    session.chat = chat;
  }

  @Get()
  findAll(@Req() request: ExpressRequest) {
    console.log('1: ');
    console.log(request.cookies);
    console.log('2: ');
    console.log(request.cookies['cookieKey']);
    console.log('3: ');
    console.log(request.signedCookies);
  }

  @Post('/v1/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    // # Simple test
    // this.userService.create(body.email, body.password);
    // # Test with auth
    // return this.authService.sugnup(body.email, body.password);
    // # Test using cookies
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/v1/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    // # Test with auth
    // return this.authService.signin(body.email, body.password);
    // # Test using cookies
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/v2/signup')
  async signupV2(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signupV2(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/v2/signin')
  async signinV2(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signinV2(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/v3/signup')
  async signupV3(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signupV3(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/v3/signin')
  async signinV3(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signinV3(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  /**
   * Ref: https://docs.nestjs.com/security/authentication#login-route
   */
  @UseGuards(AuthGuard('local')) //provisioned when we extended the passport-local strategy
  @Post('/login')
  async login(@NestRequest() req) {
    // return req.user;
    return this.authService.login(req.user);
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@NestRequest() req) {
    return req.user;
  }
}
