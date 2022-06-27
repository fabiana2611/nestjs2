import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MessageEntity } from './messages/dtos/message.entity';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/messages-axios')
  async findMessages(): Promise<MessageEntity[]> {
    const response = await this.httpService.axiosRef.get(
      'http://localhost:3000/messages',
    );

    return response.data;
  }

  @Get('/placeholder')
  async findPlaceholder(): Promise<any[]> {
    const response = await this.httpService.axiosRef.get(
      'https://jsonplaceholder.typicode.com/users',
    );

    return response.data;
  }

  @Get('/place')
  findAll() {
    const response = this.getUsers();
    response.subscribe((response) => console.log(response.data));
  }

  private getUsers(): Observable<AxiosResponse<any[]>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/users');
  }
}
