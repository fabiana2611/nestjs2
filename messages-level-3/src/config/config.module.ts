import { DynamicModule, Module } from '@nestjs/common';
import { ConfigDevelopmentService } from './config-development.service';
import { ConfigProductionService } from './config-production.service';

@Module({})
export class ConfigModule {
  static register(param: { attribute: string }): DynamicModule {
    const classProvide =
      param.attribute === 'development'
        ? ConfigDevelopmentService
        : ConfigProductionService;

    const fileProvide = {
      provide: 'CONFIG_OPTIONS',
      useValue: param,
    };

    return {
      module: ConfigModule,
      providers: [classProvide, fileProvide],
      exports: [classProvide],
    };
  }
}
