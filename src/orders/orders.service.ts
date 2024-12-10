import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from './common/pagination.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { StatusDto } from './dto/status.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PRODUCTS_MICROSERVICES } from 'src/config/services';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('Orders-services')

  async onModuleInit() {
      this.$connect;
      this.logger.log('Orders Database connected')
  }

  constructor(
    @Inject(PRODUCTS_MICROSERVICES) private readonly productsClient: ClientProxy
  ){
    super()
  }
  
  async create(createOrderDto: CreateOrderDto) {

    try {
      const productsIds =  createOrderDto.items.map((its) => its.productId)
      const products: any[] = await firstValueFrom(
        this.productsClient.send({cmd:"validate_product"},{productsIds})
      )

      const totalAmount = createOrderDto.items.reduce((acc,orderItem) => {
        const price = products.find((prod) => prod.id === orderItem.productId).price
        return price * orderItem.quantity
      },0)

      const totalItems = createOrderDto.items.reduce((acc,orderItem) => {
        return acc + orderItem.quantity
      },0)


      const order = await this.orders.create({
        data:{
          totalAmount:totalAmount,
          totalItems:totalItems,
          orderItems:{
            createMany:{
              data:[]
            }
          }
        }
      })
      

      return products
    } catch (error) {
      throw new RpcException(error)
    }

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
