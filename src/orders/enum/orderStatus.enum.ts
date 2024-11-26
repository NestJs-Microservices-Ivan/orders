import { orderStatus } from "@prisma/client";

export const orderStatusList = [
    orderStatus.CANCELLED,
    orderStatus.DELIVERED,
    orderStatus.PENDING
]