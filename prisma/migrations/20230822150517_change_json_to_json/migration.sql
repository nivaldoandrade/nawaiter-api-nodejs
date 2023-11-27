/*
  Warnings:

  - Changed the type of `items` on the `completed_order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "completed_order" DROP COLUMN "items",
ADD COLUMN     "items" JSONB NOT NULL;
