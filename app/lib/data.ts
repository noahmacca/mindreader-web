import prisma from "../lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchNeurons() {
  noStore();

  try {
    const data = await prisma.neurons.findMany();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron data.");
  }
}
