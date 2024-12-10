import { ClientsModule, Transport } from '@nestjs/microservices';

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PRODUCTS_MICROSERVICES } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[
    ClientsModule.register([
      {
        name: PRODUCTS_MICROSERVICES,
        transport: Transport.TCP,
        options:{
          port: envs.product_microservices_port,
          host: envs.product_microservices_host,
        }  
      }
    ])
  ]
})
export class OrdersModule {}
