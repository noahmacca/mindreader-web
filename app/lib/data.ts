import prisma from "../lib/prisma";
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

export async function getFeaturesForLayer(
  selectedLayers: string,
  selectedSort: string
): Promise<PrismaFeature[]> {
  try {
    // Use params to select layer
    let whereClause = {};
    if (selectedLayers !== "all") {
      const layerIdx = parseInt(selectedLayers, 10);
      if (isNaN(layerIdx)) {
        throw new Error("selectedLayers must be 'all' or a valid integer");
      }
      whereClause = { layerIdx };
    }

    // Use params for sortBy
    let orderByClause = {};
    let skip = 0;
    switch (selectedSort) {
      case "max":
        orderByClause = {
          maxActivation: "desc",
        };
        break;
      case "min":
        orderByClause = {
          maxActivation: "asc",
        };
        break;
      case "random":
        const featuresCount = await prisma.feature.count({
          where: whereClause,
        });
        skip = Math.floor(Math.random() * featuresCount);
        break;
      default:
        throw new Error(
          "Invalid selectedSort value. Must be 'max', 'min', or 'random'."
        );
    }

    const features = await prisma.feature.findMany({
      where: whereClause,
      orderBy: orderByClause,
      skip: skip,
      take: 5,
    });

    if (features.length === 0) {
      throw new Error(`No features found for layer index ${selectedLayers}`);
    }
    return features;
  } catch (error) {
    console.error(
      `Failed to fetch features from layer ${selectedLayers}:`,
      error
    );
    return [];
  }
}
