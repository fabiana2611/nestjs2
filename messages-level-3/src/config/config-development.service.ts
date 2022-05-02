import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigDevelopmentService {
  constructor() {
    console.log('---> Starting ConfigDevelopment...');
  }
}
