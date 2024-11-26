import { IsBoolean, IsDate, IsEnum, IsNumber, IsPositive, Min } from "class-validator";

import { Type } from "class-transformer";
import { orderStatus } from "@prisma/client";
import { orderStatusList } from "../enum/orderStatus.enum";

export class CreateOrderDto {

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsPositive()
    totalAmount: number;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsPositive()
    totalItems: number;

    @IsEnum(orderStatusList,{
            message: 'some of these statuses do not exist in the order status'    
        }
    )
    status: orderStatus

    @IsBoolean()
    paid: boolean = false

}
