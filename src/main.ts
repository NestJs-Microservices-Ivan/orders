import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('Orders-Microservices')
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    }
  );

  
  logger.log(`Orders Microservices running on port ${envs.port}`)
  await app.listen();
}
bootstrap();
