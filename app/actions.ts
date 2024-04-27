"use server";

import prisma from "@/app/lib/prisma";
import {
  Feature as PrismaFeature,
  FeatureImageActivationPatch,
} from "@prisma/client";
import NodeCache from "node-cache";

type ActivationHistVal = { x: number; y: number };

export interface Feature extends PrismaFeature {
  activationHistVals: ActivationHistVal[];
  images: Record<number, FeatureImageActivationPatch[]>;
  highestActivatingImages: number[];
}

const featureCache = new NodeCache({ stdTTL: 86400, checkperiod: 86400 });

function isValidActivationHistVal(obj: any): obj is ActivationHistVal {
  return obj && typeof obj.x === "number" && typeof obj.y === "number";
}

export async function getFeatureById(id: string): Promise<Feature> {
  const cachedFeature = featureCache.get<Feature>(id);
  if (cachedFeature) {
    console.log("Returning cached feature for ID", id);
    return cachedFeature;
  }

  const startTime = Date.now();
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

  const patchesByImageId = feature.featureImageActivationPatches.reduce<
    Record<number, FeatureImageActivationPatch[]>
  >((acc, patch) => {
    if (!acc[patch.imageId]) {
      acc[patch.imageId] = [];
    }
    acc[patch.imageId].push(patch);
    return acc;
  }, {});

  const highestActivatingImages = Object.entries(patchesByImageId)
    .map(([imageId, patches]) => ({
      imageId: parseInt(imageId),
      maxActivationZScore: Math.max(
        ...patches.map((patch) => patch.activationZScore)
      ),
    }))
    .sort((a, b) => b.maxActivationZScore - a.maxActivationZScore)
    .map((entry) => entry.imageId);

  console.log(
    "getFeatureById queries done",
    id,
    "Time:",
    Date.now() - startTime,
    "ms"
  );
  const { featureImageActivationPatches, ...featureWithoutPatches } = feature;
  const finalFeature = {
    ...featureWithoutPatches,
    images: patchesByImageId,
    highestActivatingImages: highestActivatingImages,
  };
  featureCache.set(id, finalFeature);
  return finalFeature;
}
