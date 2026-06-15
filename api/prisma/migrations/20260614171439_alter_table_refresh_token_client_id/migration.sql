/*
  Warnings:

  - A unique constraint covering the columns `[client_id]` on the table `refresh_token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_client_id_key" ON "refresh_token"("client_id");
