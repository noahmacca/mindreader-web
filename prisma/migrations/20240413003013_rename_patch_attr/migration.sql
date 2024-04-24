/*
  Warnings:

  - You are about to drop the column `patchLabel` on the `FeatureImageActivationPatch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FeatureImageActivationPatch" DROP COLUMN "patchLabel",
ADD COLUMN     "label" TEXT;
