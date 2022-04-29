import { HttpException, HttpStatus } from "@nestjs/common";

export class MyException extends HttpException {
  constructor() {
    console.log('--> Starting my exception...');
    super('My exception', HttpStatus.FORBIDDEN);
  }
}