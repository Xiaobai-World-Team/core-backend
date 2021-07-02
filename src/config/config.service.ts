import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  public readonly SESSION_ID = 'x1a0ba1w0r1d'
  public readonly REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
  public readonly REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
  public readonly SESSION_SECRET = process.env.SESSION_SECRET || 'x1a0ba1w0r1d_sid_secret';
}