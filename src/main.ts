import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("APP_MODULE")
  await app.listen(3000);
  logger.verbose(`SERVER RUNNING ON ${await app.getUrl()}🚀`)
  
}
bootstrap();
