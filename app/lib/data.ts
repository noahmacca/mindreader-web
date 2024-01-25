import prisma from "../lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function listNeurons() {
  // noStore();

  try {
    const neurons = await prisma.neuron.findMany({
      orderBy: {
        maxActivation: "desc",
      },
      take: 30,
    });

    const data = await Promise.all(
      neurons.map(async (neuron) => {
        const topActivations = await fetchTopActivationsForNeuron(neuron.id, 4);
        return {
          ...neuron,
          topActivations,
        };
      })
    );
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron data.");
  }
}

export async function fetchImagesById(ids: number[]) {
  noStore();

  try {
    const data = await prisma.image.findMany({
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

export async function fetchTopActivationsForNeuron(
  neuron_id: string,
  limit: number
) {
  // noStore();

  try {
    const data = await prisma.neuronImageActivation.findMany({
      where: {
        neuronId: neuron_id,
      },
      orderBy: {
        maxActivation: "desc",
      },
      take: limit,
      include: {
        Image: true,
        Neuron: true,
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron data.");
  }
}
