-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "paid" SET DEFAULT false;

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "ordersId" TEXT,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
