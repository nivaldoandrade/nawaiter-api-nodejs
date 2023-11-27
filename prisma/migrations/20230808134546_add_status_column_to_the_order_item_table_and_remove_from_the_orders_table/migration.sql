/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - Added the required column `status` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "orderitem_status" AS ENUM ('WAITING', 'IN_PRODUCTION', 'DONE');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "status" "orderitem_status" NOT NULL;

-- DropEnum
DROP TYPE "order_status";
