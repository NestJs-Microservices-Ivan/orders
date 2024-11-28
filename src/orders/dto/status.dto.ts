import { IsEnum, IsOptional, IsUUID } from "class-validator";

import { orderStatus } from "@prisma/client";
import { orderStatusList } from "../enum/orderStatus.enum";

export class StatusDto{
    @IsUUID()
    id: string

    @IsOptional()
    @IsEnum(
        orderStatusList,
        {message:`Orders status availables are ${orderStatusList}`}
    )
    status: orderStatus
}