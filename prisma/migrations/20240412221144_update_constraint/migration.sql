/*
  Warnings:

  - A unique constraint covering the columns `[modelName,featureType,layerIdx,layerType,featureIdx]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Feature_modelName_featureType_layerType_layerIdx_featureIdx_key";

-- CreateIndex
CREATE UNIQUE INDEX "Feature_modelName_featureType_layerIdx_layerType_featureIdx_key" ON "Feature"("modelName", "featureType", "layerIdx", "layerType", "featureIdx");
