import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [StoreService],
  controllers: [StoreController]
})
export class StoreModule { }
