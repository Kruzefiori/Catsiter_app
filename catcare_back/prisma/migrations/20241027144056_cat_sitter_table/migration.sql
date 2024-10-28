-- CreateEnum
CREATE TYPE "userType" AS ENUM ('OWNER', 'SITTER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "userType" NOT NULL DEFAULT 'OWNER';

-- CreateTable
CREATE TABLE "cat_sitters" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "jobDesc" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cat_sitters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cat_sitters" ADD CONSTRAINT "cat_sitters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
