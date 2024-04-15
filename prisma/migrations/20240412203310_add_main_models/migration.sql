/*
  Warnings:

  - A unique constraint covering the columns `[modelName,type,layerType,layerIdx,featureIdx]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `featureIdx` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `layerIdx` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `layerType` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxActivation` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelName` to the `Feature` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Feature` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FeatureLoc" AS ENUM ('UPSTREAM', 'SAME_LAYER', 'DOWNSTREAM');

-- CreateEnum
CREATE TYPE "ModelName" AS ENUM ('TINY_CLIP', 'CLIP');

-- CreateEnum
CREATE TYPE "FeatureType" AS ENUM ('NEURON', 'SAE_1024');

-- CreateEnum
CREATE TYPE "LayerType" AS ENUM ('ATT1', 'FC1', 'FC2');

-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "ActivationHist" INTEGER[],
ADD COLUMN     "autoInterp" TEXT,
ADD COLUMN     "featureIdx" INTEGER NOT NULL,
ADD COLUMN     "humanInterp" TEXT,
ADD COLUMN     "layerIdx" INTEGER NOT NULL,
ADD COLUMN     "layerType" "LayerType" NOT NULL,
ADD COLUMN     "maxActivation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "modelName" "ModelName" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "FeatureType" NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL,
    "label" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureImageActivation" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,
    "maxActivation" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FeatureImageActivation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureImageActivationPatch" (
    "id" SERIAL NOT NULL,
    "featureImageActivationId" INTEGER NOT NULL,
    "patchIdx" INTEGER NOT NULL,
    "zScore" DOUBLE PRECISION NOT NULL,
    "label" TEXT,

    CONSTRAINT "FeatureImageActivationPatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureCorrelation" (
    "id" SERIAL NOT NULL,
    "startFeatureId" INTEGER NOT NULL,
    "endFeatureId" INTEGER NOT NULL,
    "corr" DOUBLE PRECISION NOT NULL,
    "endFeatureLoc" "FeatureLoc" NOT NULL,

    CONSTRAINT "FeatureCorrelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeatureImageActivation_imageId_featureId_key" ON "FeatureImageActivation"("imageId", "featureId");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureCorrelation_startFeatureId_endFeatureId_key" ON "FeatureCorrelation"("startFeatureId", "endFeatureId");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_modelName_type_layerType_layerIdx_featureIdx_key" ON "Feature"("modelName", "type", "layerType", "layerIdx", "featureIdx");

-- AddForeignKey
ALTER TABLE "FeatureImageActivation" ADD CONSTRAINT "FeatureImageActivation_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureImageActivation" ADD CONSTRAINT "FeatureImageActivation_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureImageActivationPatch" ADD CONSTRAINT "FeatureImageActivationPatch_featureImageActivationId_fkey" FOREIGN KEY ("featureImageActivationId") REFERENCES "FeatureImageActivation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureCorrelation" ADD CONSTRAINT "FeatureCorrelation_startFeatureId_fkey" FOREIGN KEY ("startFeatureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureCorrelation" ADD CONSTRAINT "FeatureCorrelation_endFeatureId_fkey" FOREIGN KEY ("endFeatureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
