import { IsNumber, IsPositive, IsUUID } from "class-validator";

export class OrderItems{

    @IsNumber()
    @IsPositive()
    productId: number

    @IsNumber()
    @IsPositive()
    price: number

    @IsNumber()
    @IsPositive()
    quantity: number
    
}