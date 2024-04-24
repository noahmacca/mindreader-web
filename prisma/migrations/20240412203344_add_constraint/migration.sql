/*
  Warnings:

  - A unique constraint covering the columns `[featureImageActivationId,patchIdx]` on the table `FeatureImageActivationPatch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeatureImageActivationPatch_featureImageActivationId_patchI_key" ON "FeatureImageActivationPatch"("featureImageActivationId", "patchIdx");
