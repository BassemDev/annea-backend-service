import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  // Pipe activation for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // Host is neede in case of cloud server deployment
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
