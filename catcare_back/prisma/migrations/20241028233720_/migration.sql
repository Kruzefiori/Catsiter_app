/*
  Warnings:

  - Added the required column `castrated` to the `cats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conditions` to the `cats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protectionScreen` to the `cats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAccess` to the `cats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cats" ADD COLUMN     "castrated" BOOLEAN NOT NULL,
ADD COLUMN     "conditions" TEXT NOT NULL,
ADD COLUMN     "protectionScreen" BOOLEAN NOT NULL,
ADD COLUMN     "streetAccess" BOOLEAN NOT NULL;
