/*
  Warnings:

  - Changed the type of `name` on the `Diet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DietValue" AS ENUM ('VEGAN', 'VEGETARIAN', 'PALEO');

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "name",
ADD COLUMN     "name" "DietValue" NOT NULL;
