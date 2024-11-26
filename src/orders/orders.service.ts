import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('Orders-services')

  async onModuleInit() {
      this.$connect;
      this.logger.log('Orders Database connected')
  }

  create(createOrderDto: CreateOrderDto) {
    return createOrderDto;
  }

  findAll() {
    return `This action returns all orders in Microservice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order in Microservice OKKKK`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
