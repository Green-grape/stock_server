import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import { AllExceptionFilters } from './common/decorators/filters/all.exception.filter';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter=app.get(HttpAdapterHost);
  const configService=app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new AllExceptionFilters(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      validateCustomDecorators:true,
      transform:true
    })
  )
  await mongoose.connect(configService.get("DB_URL"));
  await app.listen(configService.get('PORT'));
  console.log(`App start in port:${configService.get('PORT')}`);
}
bootstrap();
