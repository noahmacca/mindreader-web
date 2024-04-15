import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { parse } from "csv-parse/sync";
const prisma = new PrismaClient();

async function readAndParseCSV(filePath) {
  const csvData = fs.readFileSync(filePath, "utf8");
  return parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });
}

async function main() {
  console.log("hello");
  await prisma.feature.deleteMany();
  // await prisma.image.deleteMany();
  // await prisma.featureImageActivation.deleteMany();
  console.log("deleted all");

  console.log("writing features table");
  const features = await readAndParseCSV("scripts/data/feature.csv");
  features.forEach((feature) => {
    feature.activationHistVals = JSON.parse(feature.activationHistVals);
    feature.layerIdx = parseInt(feature.layerIdx, 10);
    feature.featureIdx = parseInt(feature.featureIdx, 10);
    feature.maxActivation = parseFloat(feature.maxActivation);
  });
  console.log(
    "Parsed features from CSV into JS object:",
    features[0]["activationHistVals"][0]
  );
  await prisma.feature.createMany({
    data: features.map((feature) => ({
      id: feature.featureId,
      modelName: feature.modelName,
      featureType: feature.featureType,
      layerType: feature.layerType,
      layerIdx: feature.layerIdx,
      featureIdx: feature.featureIdx,
      humanInterp: feature.humanInterp,
      autoInterp: feature.autoInterp,
      activationHistVals: feature.activationHistVals,
      maxActivation: feature.maxActivation,
    })),
    // skipDuplicates: true, // Optional: skips entries that conflict on unique constraints
  });
  console.log(`Done writing ${features.length} features to the database.`);

  console.log("Writing featureImageActivationPatch to the database.");

  const featureImageActivationPatches = await readAndParseCSV(
    "scripts/data/featureImageActivationPatch.csv"
  );

  featureImageActivationPatches.forEach((patch) => {
    patch.imageId = parseInt(patch.imageId, 10);
    patch.patchIdx = parseInt(patch.patchIdx, 10);
    patch.activationZScore = parseFloat(patch.activationZScore);
    patch.activationValue = parseFloat(patch.activationValue);
  });

  const batchSize = 10000;
  for (let i = 0; i < featureImageActivationPatches.length; i += batchSize) {
    const batch = featureImageActivationPatches.slice(i, i + batchSize);
    await prisma.featureImageActivationPatch.createMany({
      data: batch.map((patch) => ({
        imageId: patch.imageId,
        featureId: patch.featureId,
        patchIdx: patch.patchIdx,
        activationZScore: patch.activationZScore,
        activationValue: patch.activationValue,
        label: patch.label,
      })),
      // skipDuplicates: true
    });
    console.log(
      `Batch ${
        i / batchSize + 1
      } of featureImageActivationPatches written to the database.`
    );
  }
  console.log(
    `Done writing ${featureImageActivationPatches.length} featureImageActivationPatches to the database.`
  );
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
