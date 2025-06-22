import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 8080;

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://dentist-admin-apnel.vercel.app',
      'https://deintist-frontend.vercel.app/', // Add your actual frontend domain
      process.env.FRONTEND_URL || '',
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes unknown properties
      forbidNonWhitelisted: false, // Optional: Set to true to throw an error for unknown properties
    }),
  );
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}

bootstrap();
