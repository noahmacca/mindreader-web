/*
  Warnings:

  - The `activationHistVals` column on the `Feature` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "maxAutointerpLabelFrac" DOUBLE PRECISION,
DROP COLUMN "activationHistVals",
ADD COLUMN     "activationHistVals" JSONB[];
