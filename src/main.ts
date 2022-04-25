import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mongooseConnect } from './mongodb';
import { json, urlencoded } from 'body-parser';
const port = process.env.NEST_PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.use(urlencoded({ limit: '150mb', parameterLimit: 10000000 }));
  app.use(json({ limit: '120mb' }));
  await mongooseConnect();
  await app.listen(port);
  console.log(`Nest application port is ${port}`);
}

bootstrap();
