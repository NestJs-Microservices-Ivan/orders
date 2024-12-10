import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsPositive, Min, MinLength, ValidateNested } from "class-validator";

import { OrderItems } from "./order-items.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true})
    @Type(() => OrderItems)
    items: OrderItems[]

}
