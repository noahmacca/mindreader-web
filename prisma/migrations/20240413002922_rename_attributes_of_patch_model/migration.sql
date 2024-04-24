/*
  Warnings:

  - You are about to drop the column `activation` on the `FeatureImageActivationPatch` table. All the data in the column will be lost.
  - You are about to drop the column `zScore` on the `FeatureImageActivationPatch` table. All the data in the column will be lost.
  - Added the required column `activationValue` to the `FeatureImageActivationPatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activationZScore` to the `FeatureImageActivationPatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeatureImageActivationPatch" DROP COLUMN "activation",
DROP COLUMN "zScore",
ADD COLUMN     "activationValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "activationZScore" DOUBLE PRECISION NOT NULL;
