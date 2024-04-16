import prisma from "../lib/prisma";
import {
  Feature as PrismaFeature,
  FeatureImageActivationPatch,
} from "@prisma/client";

type ActivationHistVal = { x: number; y: number };

export interface Feature extends PrismaFeature {
  activationHistVals: ActivationHistVal[];
  featureImageActivationPatches: FeatureImageActivationPatch[];
  images: Record<number, FeatureImageActivationPatch[]>;
  highestActivatingImages: number[];
}

function isValidActivationHistVal(obj: any): obj is ActivationHistVal {
  return obj && typeof obj.x === "number" && typeof obj.y === "number";
}

export async function getFeaturesForLayer(
  layerIdx: number
): Promise<Feature[]> {
  try {
    const rawFeatures = await prisma.feature.findMany({
      where: {
        layerIdx: layerIdx,
      },
      include: {
        featureImageActivationPatches: {
          orderBy: {
            patchIdx: "asc",
          },
        },
      },
      orderBy: {
        maxActivation: "desc",
      },
      take: 5,
    });

    // Validate json field in activationHistVals and add typing
    const features = rawFeatures.map((feature) => ({
      ...feature,
      activationHistVals: Array.isArray(feature.activationHistVals)
        ? feature.activationHistVals.map((val) => {
            if (isValidActivationHistVal(val)) {
              return val as ActivationHistVal;
            } else {
              throw new Error("Invalid activationHistVal data");
            }
          })
        : [],
    }));

    const featuresWithImages = features.map((feature) => {
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

      return {
        ...feature,
        images: patchesByImageId,
        highestActivatingImages: highestActivatingImages,
      };
    });

    console.log(
      "featuresWithImages",
      featuresWithImages[0].highestActivatingImages
    );

    if (features.length === 0) {
      throw new Error(`No features found for layer index ${layerIdx}`);
    }
    return featuresWithImages;
  } catch (error) {
    console.error(`Failed to fetch features from layer ${layerIdx}:`, error);
    return [];
  }
}
