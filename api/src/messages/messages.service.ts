import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private messageRepository: MessagesRepository) {}

  findAllMessages() {
    return this.messageRepository.findAll();
  }

  async create(content: string) {
    return this.messageRepository.create(content);
  }
}
