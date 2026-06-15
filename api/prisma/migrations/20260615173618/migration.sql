/*
  Warnings:

  - A unique constraint covering the columns `[jti]` on the table `refresh_token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "refresh_token_client_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_jti_key" ON "refresh_token"("jti");
