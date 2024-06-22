/*
  Warnings:

  - You are about to drop the column `carChassisNumber` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `Car` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_bookingId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "carChassisNumber";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "bookingId";

-- CreateTable
CREATE TABLE "_BookingToCar" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToCar_AB_unique" ON "_BookingToCar"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingToCar_B_index" ON "_BookingToCar"("B");

-- AddForeignKey
ALTER TABLE "_BookingToCar" ADD CONSTRAINT "_BookingToCar_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToCar" ADD CONSTRAINT "_BookingToCar_B_fkey" FOREIGN KEY ("B") REFERENCES "Car"("chassisNumber") ON DELETE CASCADE ON UPDATE CASCADE;
