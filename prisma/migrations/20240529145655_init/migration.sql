/*
  Warnings:

  - You are about to drop the column `city` on the `Donate` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Donate` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Donate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donate" DROP COLUMN "city",
DROP COLUMN "state",
DROP COLUMN "zip";
