/*
  Warnings:

  - You are about to drop the column `activationHist` on the `Feature` table. All the data in the column will be lost.
  - Added the required column `activationHistVals` to the `Feature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "activationHist",
ADD COLUMN     "activationHistVals" JSONB NOT NULL;
