export const feature = [
  {
    id: 0,
    modelId: "tinyClip",
    type: "neuron",
    layer: "1_FC1",
    layerFeatureIdx: 512,
    humanInterp: "Large leaves and grasses",
    autoInterp: "",
    activationHist: [50, 55, 60, 55, 40, 20, 10, 5, 5, 20, 35, 6, 2, 1],
    maxActivation: 0.948,
  },
];

export const image = [
  {
    id: 0,
    label: "mountain_bike",
    predicted: "mountain_bike",
  },
];

export const neuronImageActivation = [
  {
    id: 1,
    neuronId: 0,
    imageId: 139,
    maxActivation: 0.94,
  },
];

export const neuronImageActivationPatch = [
  {
    id: 0,
    neuronImageActivationId: 1,
    patchIdx: 0,
    activation: 5.2,
    zScore: 2,
    label: "Leaf",
  },
];

export const neuronCorrelation = [
  {
    id: 1,
    startNeuronId: 0,
    endNeuronId: 5,
    corr: 0.767,
    layerLocation: "UPSTREAM",
  },
];
