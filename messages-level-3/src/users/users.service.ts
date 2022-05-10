import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';

interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  public findAll() {
    return this.repository.findAll();
  }
  public find(email: string) {
    return this.repository.find(email);
  }

  public create(email: string, password: string) {
    return this.repository.create(email, password);
  }

  // https://docs.nestjs.com/security/authentication
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
