-- DropForeignKey
ALTER TABLE "FeatureImageActivation" DROP CONSTRAINT "FeatureImageActivation_featureId_fkey";

-- AddForeignKey
ALTER TABLE "FeatureImageActivation" ADD CONSTRAINT "FeatureImageActivation_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
