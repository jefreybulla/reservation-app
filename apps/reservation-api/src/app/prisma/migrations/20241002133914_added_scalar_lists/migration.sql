/*
  Warnings:

  - You are about to drop the `Endorsement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Preference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Endorsement" DROP CONSTRAINT "Endorsement_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_userId_fkey";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "endorsements" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preference" TEXT[];

-- DropTable
DROP TABLE "Endorsement";

-- DropTable
DROP TABLE "Preference";

-- DropEnum
DROP TYPE "DietValue";
