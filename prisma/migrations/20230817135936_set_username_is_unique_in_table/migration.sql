/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "table_username_key" ON "table"("username");
