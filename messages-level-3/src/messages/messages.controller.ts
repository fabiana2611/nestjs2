import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  Session,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { MessagesGuard } from '../guard/messages.guard';
import { CurrentMessage } from './decorator/messages.decorator';
import { MyException } from '../exceptions/MyException';
import { MyExceptionFilter } from '../exceptions/MyExceptionFilter';
import { MessagesInterceptor } from './interceptors/messages.interceptor';
import { AuthService } from '../auth/auth.service';
import { Serialize } from '../interceptor/serialize.interceptor';

import { Request } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(
    public messagesService: MessagesService,
    public authService: AuthService,
  ) {}

  /*
   * PS: When you use @Res from external library the developer is responsible to the response now.
   * To fix this, you can use the attribute "passthrough" to do what you need and let the rest with the framework.
   * */
  // @Get()
  // findAll(@Res({ passthrough: true }) res: Response) {
  //   res.status(HttpStatus.OK);
  //   return [];
  // }

  @Get()
  @UseGuards(MessagesGuard)
  @UseInterceptors(MessagesInterceptor)
  @UseFilters(new MyExceptionFilter())
  listMessages(@CurrentMessage() message) {
    console.log('Result my decorator: ' + message);
    // If you want to test the exceeption
    // throw new MyException();
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  /**
   * Study Notes:
   *   localhost:3000/auth/12
   *   @UseInterceptors(ClassSerializerInterceptor) // to not show password
   *   @UseInterceptors(SerializeInterceptor) // If not create a new decorator
   *   @UseInterceptors(new SerializeInterceptor(UserDto)) // make the interceptor reusable
   *   @Serialize(UserDto)// used only to this method. You can use it to the class
   *   Using custom decorator to avoid long line of interceptor
   *   Order in log:
   *   1. SerializeInterceptor - Running before the handler
   *   2. Controller.getMessage -  handler is running
   *   3. SerializeInterceptor return - I am running before response is sent out
   */
  @Serialize(CreateMessageDto)
  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    // If you want to use pipe
    // async getMessage(@Param('id', ParseIntPipe) id: number) {

    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found!!!');
    }

    return message;
  }

  @Get('/auth/test')
  authTest() {
    this.authService.signin('test@test', '123');
  }

  @Get('/exception/test')
  @UseFilters(new MyExceptionFilter())
  async testException() {
    throw new MyException();
  }
}
