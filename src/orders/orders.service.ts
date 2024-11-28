import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { date, number } from 'joi';

import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from './common/pagination.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { StatusDto } from './dto/status.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('Orders-services')

  async onModuleInit() {
      this.$connect;
      this.logger.log('Orders Database connected')
  }

  async create(createOrderDto: CreateOrderDto) {

    
    return this.orders.create({
      data: createOrderDto
    })

  }

  async findAll(PaginationDto: PaginationDto) {

    const currentPage = PaginationDto.skip
    const perPage = PaginationDto.take

    return{
      data: await this.orders.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where:{
          status: PaginationDto.status
        }
      }),
    }

  }

  async findOne(id: string) {


    const findOrder = await this.orders.findFirst(({
      where:{id}
    }))

    if (!findOrder) {
      throw new RpcException({
        message: `order ${id} not found`,
        status: HttpStatus.BAD_REQUEST
      })
    }

    return findOrder

    
  }

  async update(statusDto: StatusDto) {

    const{id,status} = statusDto

    this.findOne(id)

    return await this.orders.update({
      where:{
        id
      },
      data: {status}
    })
    
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
