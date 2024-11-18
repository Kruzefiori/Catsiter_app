-- CreateEnum
CREATE TYPE "visitStatus" AS ENUM ('PENDING', 'DONE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "bookingStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "requestedId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalVisits" INTEGER NOT NULL,
    "generalNotes" TEXT,
    "status" "bookingStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "visitNotes" TEXT,
    "status" "visitStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CatTobooking" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CatTobooking_AB_unique" ON "_CatTobooking"("A", "B");

-- CreateIndex
CREATE INDEX "_CatTobooking_B_index" ON "_CatTobooking"("B");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_requestedId_fkey" FOREIGN KEY ("requestedId") REFERENCES "cat_sitters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatTobooking" ADD CONSTRAINT "_CatTobooking_A_fkey" FOREIGN KEY ("A") REFERENCES "cats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatTobooking" ADD CONSTRAINT "_CatTobooking_B_fkey" FOREIGN KEY ("B") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
