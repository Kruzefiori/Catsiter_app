/*
  Warnings:

  - Added the required column `name` to the `cats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cats" ADD COLUMN     "name" TEXT NOT NULL;
