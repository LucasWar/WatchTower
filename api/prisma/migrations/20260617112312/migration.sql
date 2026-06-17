/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `enterprise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "enterprise_name_key";

-- AlterTable
ALTER TABLE "enterprise" ADD COLUMN     "cnpj" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_cnpj_key" ON "enterprise"("cnpj");
