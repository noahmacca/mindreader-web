import prisma from "../lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getNeuronLayers(): Promise<string[]> {
  const neurons = await prisma.neuron.findMany();
  const layerSet = new Set<string>();
  neurons.forEach((neuron) => {
    const parts = neuron.id.split("_");
    if (parts.length > 1) {
      layerSet.add(parts.slice(0, 2).join("_"));
    }
  });
  return Array.from(layerSet);
}

export async function getNeuronsForLayer(
  layer: string,
  numNeurons: number,
  numActPerNeuron: number
) {
  try {
    const neurons = await prisma.neuron.findMany({
      where: {
        id: {
          contains: layer,
        },
      },
      orderBy: {
        maxActivation: "desc",
      },
      take: numNeurons,
    });

    const data = await Promise.all(
      neurons.map(async (neuron) => {
        const topActivations = await fetchTopActivationsForNeuron(
          neuron.id,
          numActPerNeuron
        );
        return {
          ...neuron,
          topActivations,
        };
      })
    );
    return data;
  } catch (error) {
    console.error("Database Error getNeuronsForLayer:", error);
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
  neuronId: string,
  limit: number
) {
  // noStore();

  try {
    const data = await prisma.neuronImageActivation.findMany({
      where: {
        neuronId: neuronId,
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

export async function fetchTopActivationsForImage(
  imageId: number,
  limit: number
) {
  // noStore();

  try {
    const data = await prisma.neuronImageActivation.findMany({
      where: {
        imageId: imageId,
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
