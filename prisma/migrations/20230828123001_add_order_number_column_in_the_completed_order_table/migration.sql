/*
  Warnings:

  - A unique constraint covering the columns `[order_number]` on the table `completed_order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_number` to the `completed_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "completed_order" ADD COLUMN     "order_number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "completed_order_order_number_key" ON "completed_order"("order_number");
