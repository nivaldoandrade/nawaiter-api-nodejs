/*
  Warnings:

  - The values [CANCELED] on the enum `orderitem_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "orderitem_status_new" AS ENUM ('WAITING', 'IN_PRODUCTION', 'DONE', 'DELIVERED_TO_TABLE', 'CANCELLED');
ALTER TABLE "OrderItem" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "OrderItem" ALTER COLUMN "status" TYPE "orderitem_status_new" USING ("status"::text::"orderitem_status_new");
ALTER TYPE "orderitem_status" RENAME TO "orderitem_status_old";
ALTER TYPE "orderitem_status_new" RENAME TO "orderitem_status";
DROP TYPE "orderitem_status_old";
ALTER TABLE "OrderItem" ALTER COLUMN "status" SET DEFAULT 'WAITING';
COMMIT;
