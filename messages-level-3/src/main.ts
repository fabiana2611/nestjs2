import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as helmet from 'helmet';

//#1
// import cookieSession from 'cookie-session';
// This library is not completle compatible with nestjs
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);

  app.use(helmet);

  app.useGlobalPipes(new ValidationPipe());

  //#1
  //Not compatible with nestjs
  // app.use(
  //   cookieSession({
  //     name: 'session',
  //     keys: ['asdfasfd'],
  //     maxAge: 24 * 60 * 60 * 1000 // 24 hours
  //   }),
  // );

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(cookieParser());

  //this middleware requires either session middleware or cookie-parser to be initialized first
  app.use(csurf);

  // CORS preventions to REST endpoints
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
