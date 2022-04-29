import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;

  email: string;

  // to not show password
  @Exclude()
  password: string;
}
