import * as session from 'express-session';
import { RedisService } from 'nestjs-redis';
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { Redis } from 'src/redis/redis.module';

const RedisStore = ConnectRedis(session);

export const Session = SessionModule.forRootAsync({
  imports: [Redis, ConfigModule],
  inject: [RedisService, ConfigService],
  useFactory: (
    redisService: RedisService,
    config: ConfigService,
  ): NestSessionOptions => {
    const redisClient = redisService.getClient();
    const store = new RedisStore({ client: redisClient as any });
    return {
      session: {
        store,
        name: config.SESSION_ID,
        secret: config.SESSION_SECRET,
        resave: true,
        proxy: undefined,
        saveUninitialized: true,
        cookie: {
          maxAge: 60000 * 60 * 24 * 15,
          httpOnly: true,
          secure: false,
        },
      },
    };
  },
});
