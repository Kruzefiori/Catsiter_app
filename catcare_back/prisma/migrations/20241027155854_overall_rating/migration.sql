/*
  Warnings:

  - You are about to drop the column `overallRating` on the `user_providers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_providers" DROP COLUMN "overallRating";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "overallRating" DOUBLE PRECISION NOT NULL DEFAULT 0;
