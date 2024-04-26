/*
  Warnings:

  - You are about to alter the column `autointerpScoreMax` on the `Feature` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Feature" ALTER COLUMN "autointerpScoreGini" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "autointerpScoreMax" SET DATA TYPE INTEGER;
