/*
  Warnings:

  - You are about to drop the `_CatTobooking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CatTobooking" DROP CONSTRAINT "_CatTobooking_A_fkey";

-- DropForeignKey
ALTER TABLE "_CatTobooking" DROP CONSTRAINT "_CatTobooking_B_fkey";

-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "visit" ALTER COLUMN "visitDate" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "_CatTobooking";
