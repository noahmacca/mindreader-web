/*
  Warnings:

  - You are about to drop the column `maxAutointerpScore` on the `Feature` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "maxAutointerpScore",
ADD COLUMN     "autointerpScoreMax" DOUBLE PRECISION;
