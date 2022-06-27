import { IsNumber, IsString } from 'class-validator';

export class MessageEntity {
  @IsNumber()
  id: number;

  @IsString()
  content: string;
}
