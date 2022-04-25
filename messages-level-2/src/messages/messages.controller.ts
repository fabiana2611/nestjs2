import {
  Body,
  Controller,
  Get, HttpException, HttpStatus,
  NotFoundException,
  Param, ParseIntPipe,
  Post, UseFilters,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
import { MessagesGuard } from '../guard/messages.guard';
import { CurrentMessage } from "./decorator/messages.decorator";
import { MyException } from "../exceptions/MyException";
import { MyExceptionFilter } from "../exceptions/MyExceptionFilter";
import { MessagesInterceptor } from "./interceptors/messages.interceptor";

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

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

  @Get('/exception/test')
  @UseFilters(new MyExceptionFilter())
  async testException() {
    throw new MyException();
  }
}
