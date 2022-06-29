import { IsNumber, IsString, Max } from "class-validator";
// import { ApiProperty } from '@nestjs/swagger';

export class MessageEntity {
  // @ApiProperty({
  //   description: 'Identity',
  //   nullable: false,
  //   type: Number,
  //   required: false,
  // })
  /**
   * Message Identity
   * @example '1'
   */
  @Max(10000)
  @IsNumber()
  id: number;

  // @ApiProperty()
  /**
   * Short message as a chat conversation
   * @example 'Hello World!'
   */
  @IsString()
  content: string;
}
