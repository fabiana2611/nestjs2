import { Controller, Get, Param, Req, Session } from "@nestjs/common";
import {Request} from 'express';

@Controller('auth')
export class AuthController {
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
  findAll(@Req() request: Request) {
    console.log('1: ');
    console.log(request.cookies);
    console.log('2: ');
    console.log(request.cookies['cookieKey']);
    console.log('3: ');
    console.log(request.signedCookies);
  }

}
