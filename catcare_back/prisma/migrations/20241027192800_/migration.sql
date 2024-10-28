/*
  Warnings:

  - You are about to drop the column `overallRating` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `cat_sitters` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_providers" ADD COLUMN     "overallRating" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "overallRating";

-- CreateIndex
CREATE UNIQUE INDEX "cat_sitters_userId_key" ON "cat_sitters"("userId");
