import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  public repository: UserEntity[] = [
    { id: 1, email: 'test@test', password: '123' },
  ];

  public create(email: string, password: string) {
    const user: UserEntity = new UserEntity();
    user.id = this.repository.length;
    user.email = email;
    user.password = password;
    this.repository.push(user);
    return user;
  }

  public find(email: string): UserEntity {
    return this.repository.find((user: UserEntity) => user.email == email);
  }

  public findAll() {
    return this.repository;
  }
}
