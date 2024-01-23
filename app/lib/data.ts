import prisma from "../lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchNeurons() {
  noStore();

  try {
    const data = await prisma.neurons.findMany({
      orderBy: {
        max_activation: "desc",
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron data.");
  }
}

export async function fetchImagesById(ids: number[]) {
  noStore();

  try {
    const data = await prisma.images.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron data.");
  }
}

export async function fetchTopActivationsForNeuron(neuron_id: string) {
  noStore();

  try {
    const data = await prisma.neuron_image_activations.findMany({
      where: {
        neuron_id: neuron_id,
      },
      orderBy: {
        max_activation: "desc",
      },
      take: 10,
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron data.");
  }
}
