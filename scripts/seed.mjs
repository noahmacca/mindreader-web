import { put } from "@vercel/blob";
import { db } from "@vercel/postgres";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedImagesBlob() {
  try {
    console.log("Adding image files to blob store");
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
        const { url } = await put(`image/${file}`, imageData, {
          access: "public",
        });

        res.push({
          name: file,
          url: url,
        });
      });
      console.log(res);
    });
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedActivationsBlob() {
  try {
    console.log("Adding activation files to blob store");
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedImagesDb(client) {
  try {
    // Create the "Image" table if it doesn't exist
    // const createTable = await client.sql`
    //   CREATE TABLE IF NOT EXISTS "Image" (
    //     id SERIAL PRIMARY KEY,
    //     label VARCHAR NOT NULL,
    //     predicted VARCHAR NOT NULL,
    //     maxActivation FLOAT NOT NULL,
    //     data VARCHAR NOT NULL
    //   );
    // `;

    console.log(`Created "Image" table`);

    // Insert data into the "users" table
    // const insertedUsers = await Promise.all(
    //   users.map(async (user) => {
    //     const hashedPassword = await bcrypt.hash(user.password, 10);
    //     return client.sql`
    //     INSERT INTO users (id, name, email, password)
    //     VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
    //     ON CONFLICT (id) DO NOTHING;
    //   `;
    //   })
    // );

    console.log(`Seeded n images`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedNeuronsDb(client) {
  try {
    // Create the "Image" table if it doesn't exist
    // const createTable = await client.sql`
    //   CREATE TABLE IF NOT EXISTS "Image" (
    //     id SERIAL PRIMARY KEY,
    //     label VARCHAR NOT NULL,
    //     predicted VARCHAR NOT NULL,
    //     maxActivation FLOAT NOT NULL,
    //     data VARCHAR NOT NULL
    //   );
    // `;

    console.log(`Created "Image" table`);

    // Insert data into the "users" table
    // const insertedUsers = await Promise.all(
    //   users.map(async (user) => {
    //     const hashedPassword = await bcrypt.hash(user.password, 10);
    //     return client.sql`
    //     INSERT INTO users (id, name, email, password)
    //     VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
    //     ON CONFLICT (id) DO NOTHING;
    //   `;
    //   })
    // );

    console.log(`Seeded n images`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedNeuronImageActivationsDb(client) {
  try {
    // Create the "Image" table if it doesn't exist
    // const createTable = await client.sql`
    //   CREATE TABLE IF NOT EXISTS "Image" (
    //     id SERIAL PRIMARY KEY,
    //     label VARCHAR NOT NULL,
    //     predicted VARCHAR NOT NULL,
    //     maxActivation FLOAT NOT NULL,
    //     data VARCHAR NOT NULL
    //   );
    // `;

    console.log(`Created "Image" table`);

    // Insert data into the "users" table
    // const insertedUsers = await Promise.all(
    //   users.map(async (user) => {
    //     const hashedPassword = await bcrypt.hash(user.password, 10);
    //     return client.sql`
    //     INSERT INTO users (id, name, email, password)
    //     VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
    //     ON CONFLICT (id) DO NOTHING;
    //   `;
    //   })
    // );

    console.log(`Seeded n images`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  // Write images and activations to blob storage, and save the urls
  await seedImagesBlob();
  await seedActivationsBlob();

  // Write data to postgres, including the blob urls
  const client = await db.connect();
  await seedImagesDb(client);
  await seedNeuronsDb(client);
  await seedNeuronImageActivationsDb(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
