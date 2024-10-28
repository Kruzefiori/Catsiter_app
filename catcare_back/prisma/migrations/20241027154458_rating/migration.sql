/*
  Warnings:

  - You are about to drop the column `rating` on the `cat_sitters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cat_sitters" DROP COLUMN "rating";

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "catSitterId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "review" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_catSitterId_fkey" FOREIGN KEY ("catSitterId") REFERENCES "cat_sitters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
