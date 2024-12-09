/*
  Warnings:

  - You are about to drop the column `catSitterId` on the `addresses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_catSitterId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "catSitterId";

-- AlterTable
ALTER TABLE "cat_sitters" ADD COLUMN     "attendancePlaces" TEXT[];
