/*
  Warnings:

  - The values [TINY_CLIP,CLIP] on the enum `ModelName` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `featureImageActivationId` on the `FeatureImageActivationPatch` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `FeatureImageActivationPatch` table. All the data in the column will be lost.
  - You are about to drop the `FeatureImageActivation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imageId,featureId,patchIdx]` on the table `FeatureImageActivationPatch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `featureId` to the `FeatureImageActivationPatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `FeatureImageActivationPatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModelName_new" AS ENUM ('CLIP_TINY', 'CLIP_NORMAL', 'VIT_NORMAL', 'VIT_LARGE');
ALTER TABLE "Feature" ALTER COLUMN "modelName" TYPE "ModelName_new" USING ("modelName"::text::"ModelName_new");
ALTER TYPE "ModelName" RENAME TO "ModelName_old";
ALTER TYPE "ModelName_new" RENAME TO "ModelName";
DROP TYPE "ModelName_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "FeatureCorrelation" DROP CONSTRAINT "FeatureCorrelation_endFeatureId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureCorrelation" DROP CONSTRAINT "FeatureCorrelation_startFeatureId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureImageActivation" DROP CONSTRAINT "FeatureImageActivation_featureId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureImageActivation" DROP CONSTRAINT "FeatureImageActivation_imageId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureImageActivationPatch" DROP CONSTRAINT "FeatureImageActivationPatch_featureImageActivationId_fkey";

-- DropIndex
DROP INDEX "FeatureImageActivationPatch_featureImageActivationId_patchI_key";

-- AlterTable
ALTER TABLE "FeatureImageActivationPatch" DROP COLUMN "featureImageActivationId",
DROP COLUMN "label",
ADD COLUMN     "featureId" INTEGER NOT NULL,
ADD COLUMN     "imageId" INTEGER NOT NULL,
ADD COLUMN     "imageLabel" TEXT,
ADD COLUMN     "patchLabel" TEXT;

-- DropTable
DROP TABLE "FeatureImageActivation";

-- CreateIndex
CREATE UNIQUE INDEX "FeatureImageActivationPatch_imageId_featureId_patchIdx_key" ON "FeatureImageActivationPatch"("imageId", "featureId", "patchIdx");

-- AddForeignKey
ALTER TABLE "FeatureImageActivationPatch" ADD CONSTRAINT "FeatureImageActivationPatch_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureImageActivationPatch" ADD CONSTRAINT "FeatureImageActivationPatch_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureCorrelation" ADD CONSTRAINT "FeatureCorrelation_startFeatureId_fkey" FOREIGN KEY ("startFeatureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureCorrelation" ADD CONSTRAINT "FeatureCorrelation_endFeatureId_fkey" FOREIGN KEY ("endFeatureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
