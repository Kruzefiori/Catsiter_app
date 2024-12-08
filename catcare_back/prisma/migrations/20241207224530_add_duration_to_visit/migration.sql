/*
  Warnings:

  - Added the required column `durationInMinutes` to the `visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visit" ADD COLUMN     "durationInMinutes" INTEGER NOT NULL;
