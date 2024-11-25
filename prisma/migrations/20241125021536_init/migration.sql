-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('CANCELLED', 'PENDING', 'DELIVERED');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "status" "orderStatus" NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
