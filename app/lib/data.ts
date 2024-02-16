import prisma from "../lib/prisma";

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

export async function fetchTopCorrsForNeuron(id: string, top_n: number) {
  try {
    const neuronCorrs = await prisma.neuronCorrelation.findMany({
      where: {
        startNeuronId: id,
      },
    });

    const upstreamCorrs = neuronCorrs
      .filter((corr) => corr.isUpstream)
      .sort((a, b) => b.corr - a.corr)
      .slice(0, top_n);

    const upstreamCorrsActivations = await Promise.all(
      upstreamCorrs.map(async (corr) => ({
        neuronId: corr.endNeuronId,
        corr: corr.corr,
        activations: await prisma.neuronImageActivation.findMany({
          where: {
            neuronId: corr.endNeuronId,
          },
          orderBy: {
            maxActivation: "desc",
          },
          take: 5,
        }),
      }))
    );
    const downstreamCorrs = neuronCorrs
      .filter((corr) => !corr.isUpstream)
      .sort((a, b) => b.corr - a.corr)
      .slice(0, top_n);

    const downstreamCorrsActivations = await Promise.all(
      downstreamCorrs.map(async (corr) => ({
        neuronId: corr.endNeuronId,
        corr: corr.corr,
        activations: await prisma.neuronImageActivation.findMany({
          where: {
            neuronId: corr.endNeuronId,
          },
          orderBy: {
            maxActivation: "desc",
          },
          take: 5,
        }),
      }))
    );

    return {
      upstreamCorrsActivations,
      downstreamCorrsActivations,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neuron correlations.");
  }
}
