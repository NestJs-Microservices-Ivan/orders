import { CreateOrderDto } from './dto/create-order.dto';
import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
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
