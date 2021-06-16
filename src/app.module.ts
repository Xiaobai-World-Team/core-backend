import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [UsersModule, AuthModule, StorageModule, StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
