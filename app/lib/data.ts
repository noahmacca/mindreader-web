import prisma from "../lib/prisma";

function getLayersFromNeuronIds(neuronIds: Array<string>) {
  const layerSet = new Set<string>();
  neuronIds.forEach((neuronId) => {
    const parts = neuronId.split("_");
    if (parts.length > 1) {
      layerSet.add(parts.slice(0, 2).join("_"));
    }
  });
  return Array.from(layerSet);
}

export async function getNeuronLayers(): Promise<string[]> {
  const neurons = await prisma.neuron.findMany();
  return getLayersFromNeuronIds(neurons.map((neuron) => neuron.id));
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
    const layers = await getNeuronLayers();

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

    const layerActivations = layers.map((layer) => ({
      name: layer,
      neuronActivations: activations.filter((item) =>
        item.Neuron.id.includes(layer)
      ),
    }));

    return {
      image: activations[0].Image,
      numActivations: activations.length,
      layerActivations,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron data.");
  }
}
