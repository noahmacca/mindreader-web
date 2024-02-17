import prisma from "../lib/prisma";
import { layer_location_enum } from "@prisma/client";

export async function getNeuronLayers(): Promise<string[]> {
  const neurons = await prisma.neuron.findMany({
    select: {
      id: true,
    },
  });
  const layerSet = new Set(
    neurons.map((neuron) => neuron.id.split("_").slice(0, 2).join("_"))
  );
  const layers = Array.from(layerSet).sort();

  return layers;
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
  limit: number,
  imageId?: number
) {
  try {
    const data = await prisma.neuronImageActivation.findMany({
      where: {
        neuronId: neuronId,
        ...(imageId ? { Image: { id: imageId } } : {}),
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

export async function fetchImageInfo(imageId: number) {
  try {
    const image = await prisma.image.findFirst({
      where: {
        id: imageId,
      },
    });
    return image;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("fetchImageInfo failed.");
  }
}

export async function fetchTopActivationsForImage(
  imageId: number,
  limit: number
) {
  try {
    const activations = await prisma.neuronImageActivation.findMany({
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

    return {
      image: activations[0].Image,
      numActivations: activations.length,
      activations,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron data.");
  }
}

type NeuronCorrelation = {
  endNeuronId: string;
  corr: number;
  layerLocation: layer_location_enum;
};

const getCorrNeurons = async (
  corrs: NeuronCorrelation[],
  nNeurons: number,
  layerLocation: layer_location_enum
) => {
  const n_images_per_neuron = 20;
  return await Promise.all(
    corrs
      .filter((corr: NeuronCorrelation) => corr.layerLocation === layerLocation)
      .sort((a: NeuronCorrelation, b: NeuronCorrelation) => b.corr - a.corr)
      .slice(0, nNeurons)
      .map(async (corr: NeuronCorrelation) => ({
        id: corr.endNeuronId,
        corr: corr.corr,
        topActivations: await prisma.neuronImageActivation.findMany({
          where: {
            neuronId: corr.endNeuronId,
          },
          orderBy: {
            maxActivation: "desc",
          },
          take: n_images_per_neuron,
          include: {
            Image: true,
            Neuron: true,
          },
        }),
      }))
  );
};

export async function fetchTopCorrsForNeuron(id: string, top_n: number) {
  try {
    const neuronCorrs = await prisma.neuronCorrelation.findMany({
      where: {
        startNeuronId: id,
      },
    });

    const upstreamCorrNeurons = await getCorrNeurons(
      neuronCorrs,
      top_n,
      layer_location_enum.LOWER
    );
    const downstreamCorrNeurons = await getCorrNeurons(
      neuronCorrs,
      top_n,
      layer_location_enum.HIGHER
    );
    const sameLayerCorrNeurons = await getCorrNeurons(
      neuronCorrs,
      top_n,
      layer_location_enum.SAME
    );

    return {
      upstreamCorrNeurons,
      downstreamCorrNeurons,
      sameLayerCorrNeurons,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron correlations.");
  }
}
