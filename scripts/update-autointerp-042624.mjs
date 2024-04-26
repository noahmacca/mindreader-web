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
  console.log(
    "Starting update-autointerp-042624. Updating each feature autointerp and maxAutointerpZScore"
  );
  console.log(
    "Reading features from CSV to update autoInterp and maxAutointerpZScore"
  );
  const featureUpdates = await readAndParseCSV("scripts/data/feature.csv");

  for (const feature of featureUpdates) {
    const { featureId, autoInterp, autointerpScoreMax, autointerpScoreGini } =
      feature;
    await prisma.feature.update({
      where: { id: featureId },
      data: {
        autoInterp: autoInterp,
        autointerpScoreMax: parseFloat(autointerpScoreMax),
        autointerpScoreGini: parseFloat(autointerpScoreGini),
      },
    });
  }
  console.log(
    "Updated autoInterp, autointerpScoreMax, autointerpScoreGini for features."
  );
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
