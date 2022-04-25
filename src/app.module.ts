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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    StorageModule,
    StoreModule,
    Session,
    RedisModule,
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
