import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';

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
}
