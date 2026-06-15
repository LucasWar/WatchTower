/*
  Warnings:

  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_client_id_fkey";

-- DropTable
DROP TABLE "RefreshToken";

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" UUID NOT NULL,
    "client_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
