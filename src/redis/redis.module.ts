import { DynamicModule } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

export const Redis: DynamicModule = RedisModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService): RedisModuleOptions => {
    return {
      name: 'cms_center',
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    };
  },
});