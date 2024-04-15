/*
  Warnings:

  - The primary key for the `Feature` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "FeatureCorrelation" DROP CONSTRAINT "FeatureCorrelation_endFeatureId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureCorrelation" DROP CONSTRAINT "FeatureCorrelation_startFeatureId_fkey";

-- DropForeignKey
ALTER TABLE "FeatureImageActivationPatch" DROP CONSTRAINT "FeatureImageActivationPatch_featureId_fkey";

-- AlterTable
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Feature_id_seq";

-- AlterTable
ALTER TABLE "FeatureCorrelation" ALTER COLUMN "startFeatureId" SET DATA TYPE TEXT,
ALTER COLUMN "endFeatureId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FeatureImageActivationPatch" ALTER COLUMN "featureId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "FeatureImageActivationPatch" ADD CONSTRAINT "FeatureImageActivationPatch_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureCorrelation" ADD CONSTRAINT "FeatureCorrelation_startFeatureId_fkey" FOREIGN KEY ("startFeatureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureCorrelation" ADD CONSTRAINT "FeatureCorrelation_endFeatureId_fkey" FOREIGN KEY ("endFeatureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
