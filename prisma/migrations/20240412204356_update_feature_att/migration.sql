/*
  Warnings:

  - You are about to drop the column `type` on the `Feature` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[modelName,featureType,layerType,layerIdx,featureIdx]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `featureType` to the `Feature` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Feature_modelName_type_layerType_layerIdx_featureIdx_key";

-- AlterTable
ALTER TABLE "Feature" DROP COLUMN "type",
ADD COLUMN     "featureType" "FeatureType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Feature_modelName_featureType_layerType_layerIdx_featureIdx_key" ON "Feature"("modelName", "featureType", "layerType", "layerIdx", "featureIdx");
