import prisma from "../lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function listNeurons() {
  noStore();

  try {
    const data = await prisma.neuron.findMany({
      // where: {
      //   id: {
      //     contains: "FC2",
      //   },
      // },
      orderBy: {
        maxActivation: "desc",
      },
      take: 50,
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

export async function fetchTopActivationsForNeuron(neuron_id: string) {
  noStore();

  try {
    const data = await prisma.neuronImageActivation.findMany({
      where: {
        neuronId: neuron_id,
      },
      orderBy: {
        maxActivation: "desc",
      },
      take: 50,
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
