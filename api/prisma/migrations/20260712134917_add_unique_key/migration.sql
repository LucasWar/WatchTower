/*
  Warnings:

  - A unique constraint covering the columns `[enterpriseId,name]` on the table `service` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "service_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "service_enterpriseId_name_key" ON "service"("enterpriseId", "name");
