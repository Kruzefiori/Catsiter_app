/*
  Warnings:

  - You are about to drop the column `catSitterId` on the `ratings` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_catSitterId_fkey";

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "catSitterId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_providers" ADD COLUMN     "overallRating" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
