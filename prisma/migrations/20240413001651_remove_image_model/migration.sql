/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeatureImageActivationPatch" DROP CONSTRAINT "FeatureImageActivationPatch_imageId_fkey";

-- DropTable
DROP TABLE "Image";
