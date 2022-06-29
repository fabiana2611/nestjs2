import { Controller, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  /**
   * Return all messages
   */
  @Get()
  async findAll() {
    return await this.messageService.findAllMessages();
  }
}
