/*
  Warnings:

  - You are about to drop the column `maxAutointerpLabelFrac` on the `Feature` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "maxAutointerpLabelFrac",
ADD COLUMN     "maxAutointerpZScore" DOUBLE PRECISION;
