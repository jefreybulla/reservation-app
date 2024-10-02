/*
  Warnings:

  - You are about to drop the `Diet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_parentRestaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_parentUserId_fkey";

-- DropTable
DROP TABLE "Diet";

-- CreateTable
CREATE TABLE "Preference" (
    "id" SERIAL NOT NULL,
    "name" "DietValue" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endorsement" (
    "id" SERIAL NOT NULL,
    "name" "DietValue" NOT NULL,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "Endorsement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endorsement" ADD CONSTRAINT "Endorsement_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
