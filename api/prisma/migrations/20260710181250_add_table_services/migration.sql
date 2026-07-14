/*
  Warnings:

  - You are about to drop the column `service` on the `logs` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "logs_service_idx";

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "service",
ADD COLUMN     "serviceId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "service" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "enterpriseId" UUID NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- CreateIndex
CREATE INDEX "service_name_idx" ON "service"("name");

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
