"use server";

import prisma from "@/app/lib/prisma";
import {
  Feature as PrismaFeature,
  FeatureImageActivationPatch,
} from "@prisma/client";

type ActivationHistVal = { x: number; y: number };

export interface Feature extends PrismaFeature {
  activationHistVals: ActivationHistVal[];
  // featureImageActivationPatches: FeatureImageActivationPatch[];
  images: Record<number, FeatureImageActivationPatch[]>;
  highestActivatingImages: number[];
}

function isValidActivationHistVal(obj: any): obj is ActivationHistVal {
  return obj && typeof obj.x === "number" && typeof obj.y === "number";
}

export async function getFeatureById(id: string): Promise<Feature> {
  const rawFeature = await prisma.feature.findUnique({
    where: { id },
    include: {
      featureImageActivationPatches: {
        orderBy: {
          patchIdx: "asc",
        },
      },
    },
  });

  if (!rawFeature) {
    throw new Error(`Feature not found with ID=${id}`);
  }

  const feature = {
    ...rawFeature,
    activationHistVals: Array.isArray(rawFeature.activationHistVals)
      ? rawFeature.activationHistVals.map((val) => {
          if (isValidActivationHistVal(val)) {
            return val as ActivationHistVal;
          } else {
            throw new Error("Invalid activationHistVal data");
          }
        })
      : [],
  };

  //   const featuresWithImages = features.map((feature) => {
  const patchesByImageId = feature.featureImageActivationPatches.reduce<
    Record<number, FeatureImageActivationPatch[]>
  >((acc, patch) => {
    if (!acc[patch.imageId]) {
      acc[patch.imageId] = [];
    }
    acc[patch.imageId].push(patch);
    return acc;
  }, {});

  // Create a list of imageIds sorted by the max activationZScore of any patch
  const highestActivatingImages = Object.entries(patchesByImageId)
    .map(([imageId, patches]) => ({
      imageId: parseInt(imageId),
      maxActivationZScore: Math.max(
        ...patches.map((patch) => patch.activationZScore)
      ),
    }))
    .sort((a, b) => b.maxActivationZScore - a.maxActivationZScore)
    .map((entry) => entry.imageId);

  const { featureImageActivationPatches, ...featureWithoutPatches } = feature;
  return {
    ...featureWithoutPatches,
    images: patchesByImageId,
    highestActivatingImages: highestActivatingImages,
  };
}
