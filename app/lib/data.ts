import prisma from "../lib/prisma";
import { Feature, ModelName, FeatureType } from "@prisma/client";

interface WhereClause {
  modelName: ModelName;
  featureType: FeatureType;
  layerIdx?: number;
  autoInterp?: {
    contains: string;
  };
}

export async function getUniqueFeatureAttributes() {
  const uniqueCombinations = await prisma.feature.groupBy({
    by: ["modelName", "featureType", "layerType", "layerIdx"],
    _count: {
      id: true,
    },
  });

  return uniqueCombinations.map((item) => ({
    modelName: item.modelName,
    featureType: item.featureType,
    layerType: item.layerType,
    layerIdx: item.layerIdx,
    count: item._count.id,
  }));
}

export async function getFeaturesForLayer(
  selectedModel: string,
  selectedFeatures: string,
  selectedLayers: string,
  selectedSort: string,
  searchString?: string
): Promise<Feature[]> {
  try {
    // Use params to select layer, model, and feature type
    let whereClause: WhereClause = {
      modelName: selectedModel.toUpperCase() as ModelName,
      featureType: selectedFeatures.toUpperCase() as FeatureType,
    };
    if (selectedLayers !== "all") {
      const layerIdx = parseInt(selectedLayers, 10);
      if (isNaN(layerIdx)) {
        throw new Error("selectedLayers must be 'all' or a valid integer");
      }
      whereClause.layerIdx = layerIdx;
    }
    if (searchString) {
      whereClause.autoInterp = { contains: searchString.toLowerCase() };
    }

    // Use params for sortBy
    let orderByClause = {};
    let skip = 0;
    switch (selectedSort) {
      case "max_activation":
        orderByClause = {
          maxActivation: "desc",
        };
        break;
      case "min_activation":
        orderByClause = {
          maxActivation: "asc",
        };
        break;
      case "max_autointerp_score":
        orderByClause = {
          autointerpScoreMax: "desc",
        };
        break;
      case "min_autointerp_score":
        orderByClause = {
          autointerpScoreMax: "asc",
        };
        break;
      case "max_autointerp_gini":
        orderByClause = {
          autointerpScoreGini: "desc",
        };
        break;
      case "min_autointerp_gini":
        orderByClause = {
          autointerpScoreGini: "asc",
        };
        break;
      case "random":
        const featuresCount = await prisma.feature.count({
          where: whereClause,
        });
        skip = Math.floor(Math.random() * featuresCount);
        break;
      default:
        throw new Error(`Invalid selectedSort value=${selectedSort}`);
    }

    const features = await prisma.feature.findMany({
      where: whereClause,
      orderBy: orderByClause,
      skip: skip,
      take: 50,
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
