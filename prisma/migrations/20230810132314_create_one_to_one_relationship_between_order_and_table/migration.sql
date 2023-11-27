/*
  Warnings:

  - You are about to drop the column `table` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[table_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `table_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "table",
ADD COLUMN     "table_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_table_id_key" ON "Order"("table_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
