/*
  Warnings:

  - A unique constraint covering the columns `[apiId]` on the table `enterprise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiId` to the `enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enterprise" ADD COLUMN     "apiId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_apiId_key" ON "enterprise"("apiId");
