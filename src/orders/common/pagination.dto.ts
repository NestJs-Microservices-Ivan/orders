import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

import { Type } from "class-transformer"
import { number } from "joi"
import { orderStatus } from "@prisma/client"
import { orderStatusList } from "../enum/orderStatus.enum"

export class PaginationDto{

    @IsPositive()
    @IsNumber()
    @Type(() => number)
    take?: number = 10

    @IsPositive()
    @IsNumber()
    @Type(() => number)
    skip?: number = 1

    @IsString()
    @IsEnum(orderStatusList,{message: `orders availables are ${orderStatusList}`})
    @IsOptional()
    status?: orderStatus

}