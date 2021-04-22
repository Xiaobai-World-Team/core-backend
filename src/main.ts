import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mongooseConnect } from './mongodb';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await mongooseConnect();
  await app.listen(3001);
}

bootstrap();
