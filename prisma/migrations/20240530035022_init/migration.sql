/*
  Warnings:

  - You are about to drop the column `description` on the `Donate` table. All the data in the column will be lost.
  - You are about to drop the column `isVacinated` on the `Donate` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Donate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVaccinated` to the `Donate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Donate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donate" DROP COLUMN "description",
DROP COLUMN "isVacinated",
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "isVaccinated" BOOLEAN NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL;
