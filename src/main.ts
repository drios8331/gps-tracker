import { NestFactory } from '@nestjs/core';
import { GpsModule } from './modules/gps/gps.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(GpsModule);
  console.log('Nest app bootstrapped (TCP only)');
}
bootstrap();
