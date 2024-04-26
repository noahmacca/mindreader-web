/*
  Warnings:

  - You are about to drop the column `maxAutointerpZScore` on the `Feature` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "maxAutointerpZScore",
ADD COLUMN     "autointerpScoreGini" INTEGER,
ADD COLUMN     "maxAutointerpScore" DOUBLE PRECISION;
