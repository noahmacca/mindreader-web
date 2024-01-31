import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log("putting in blob");

  const directoryPath = path.join(__dirname, "data", "images");
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    const res = [];
    files.slice(0, 5).forEach(async function (file) {
      console.log("storing ", file);
      const filePath = path.join(directoryPath, file);
      const imageData = fs.readFileSync(filePath);
      const { url } = await put(`articles/${file}`, imageData, {
        access: "public",
      });

      res.push({
        name: file,
        url: url,
      });
    });
    console.log(res);
  });
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
