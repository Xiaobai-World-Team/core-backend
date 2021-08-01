import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  public readonly SESSION_ID = process.env.XiaobaiSessionId; 
  public readonly REDIS_HOST = process.env.XiaobaiRedisHost;
  public readonly REDIS_ACCOUNT = process.env.XiaobaiRedisAccount;
  public readonly REDIS_PASSWORD = process.env.XiaobaiRedisPassword
  public readonly REDIS_PORT = Number(process.env.XiaobaiRedisPort || 6379);
  public readonly SESSION_SECRET = process.env.XiaobaiSessionSecret;
}