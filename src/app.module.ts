import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import { StoreModule } from './store/store.module';
import { ConfigModule } from './config/config.module';
import { RedisModule } from 'nestjs-redis';
import { Session } from './session/session.module';

@Module({
  imports: [UsersModule, AuthModule, StorageModule, StoreModule, Session, RedisModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
