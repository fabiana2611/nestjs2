import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signin(email: string, password: string) {
    console.log('--> Start AuthService signin...');
    console.log(`email: ${email}, pwd: ${password}`);
  }
}
