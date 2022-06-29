import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { MessageEntity } from './messages/dtos/message.entity';
import { HttpService } from '@nestjs/axios';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiBody,
  ApiConsumes, ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse, ApiOAuth2,
  ApiOkResponse,
  ApiProduces,
  ApiProperty,
  ApiRequestTimeoutResponse,
  ApiResponse, ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { MessagesService } from './messages/messages.service';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@ApiTags('messages-api')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
    private messagesService: MessagesService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiResponse({
    type: MessageEntity,
    status: 200,
    description: 'All the messages received',
  })
  @Get('/messages-axios')
  async findMessages(): Promise<MessageEntity[]> {
    const response = await this.httpService.axiosRef.get(
      'http://localhost:3000/messages',
    );

    return response.data;
  }

  @Post('messages')
  @ApiConsumes('application/json')
  @HttpCode(200)
  @HttpCode(400)
  @ApiBody({
    description: 'Description my body',
    type: MessageEntity,
    examples: {
      id: { value: '1' },
      content: { value: 'my message' },
    },
  })
  /**
   * Test plugin
   * @example {id: 1, content: 'test'}
   * @param body
   */
  createMessage(@Body() body: MessageEntity) {
    return this.messagesService.create(body.content);
  }

  @Post('messages2')
  @ApiOkResponse({ description: 'Response OK.' } )
  @ApiCreatedResponse({ description: 'Successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid Attributes' })
  @ApiRequestTimeoutResponse({ description: 'Timeout Exception.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Error.' })
  @ApiNotFoundResponse({ description: 'The entity was not found.' })
  @ApiInternalServerErrorResponse({ description: 'Generic error.' })
  // @ApiSecurity('bearer')
  // @ApiBearerAuth()
  // @ApiOAuth2(['pets:write'])
  // @ApiCookieAuth()
  createMessage2(@Body() body: MessageEntity) {
    return this.messagesService.create(body.content);
  }

  @Get('/placeholder')
  async findPlaceholder(): Promise<any[]> {
    const response = await this.httpService.axiosRef.get(
      'https://jsonplaceholder.typicode.com/users',
    );

    return response.data;
  }

  @Get('/place')
  @ApiProduces('application/json')
  findAll() {
    const response = this.getUsers();
    response.subscribe((response) => console.log(response.data));
  }

  private getUsers(): Observable<AxiosResponse<any[]>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/users');
  }
}
