/*
  Warnings:

  - Added the required column `activation` to the `FeatureImageActivationPatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeatureImageActivationPatch" ADD COLUMN     "activation" DOUBLE PRECISION NOT NULL;
