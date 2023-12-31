import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  // Pipe activation for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // Protect the APP from well known web vulnarabilities middleware
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  // Enable Cors for specifc domain access with specific headers
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: ['http://localhost:3000', 'https://annea-ui.onrender.com'],
    credentials: true,
  });

  // Host is neede in case of cloud server deployment
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
