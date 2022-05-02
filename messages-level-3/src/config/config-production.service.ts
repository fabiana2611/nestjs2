import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ConfigProductionService {
  constructor(@Inject('CONFIG_OPTIONS') private options) {
    console.log('---> Starting ConfigProduction...');

    if (options.attribute === 'production') {
      console.log('---> It is in production environment');
    } else {
      console.log(`---> It is in test environment: ${options.attribute}`);
    }
  }
}
