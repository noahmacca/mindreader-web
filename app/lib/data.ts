import prisma from "../lib/prisma";
import { Feature as PrismaFeature } from "@prisma/client";

type ActivationHistVal = { x: number; y: number };

export interface Feature extends PrismaFeature {
  activationHistVals: ActivationHistVal[];
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
        featureImageActivationPatches: true,
      },
    });
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
    if (features.length === 0) {
      throw new Error(`No features found for layer index ${layerIdx}`);
    }
    return features;
  } catch (error) {
    console.error(`Failed to fetch features from layer ${layerIdx}:`, error);
    return [];
  }
}
