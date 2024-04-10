import {
  feature,
  image,
  neuronImageActivation,
  neuronImageActivationPatch,
  neuronCorrelation,
} from "./data";

export const getSampleNeuronData = () => {
  const res = {
    modelId: "tinyClip",
    featureType: "SAE",
    nodeCount: 1024,
    features: [
      {
        feature: {
          id: 0,
          modelId: "tinyClip",
          type: "neuron",
          layerIdx: 1,
          layerType: "FC1",
          featureIdx: 512,
          humanInterp: "Large leaves and grasses",
          autoInterp:
            "Forests, leaves, flowers, and branches are all apprent in these images.",
          activationHist: [50, 55, 60, 55, 40, 20, 10, 5, 5, 20, 35, 6, 2, 1],
          maxActivation: 0.948,
        },
        corrsUpstream: [
          {
            featureIdx: "L:4 N:221",
            humanInterp: "Green colors",
            corr: 0.92,
          },
          {
            featureIdx: "L:4 N:222",
            humanInterp: "Leaf textures",
            corr: 0.87,
          },
          {
            featureIdx: "L:4 N:223",
            humanInterp: "Grass blades",
            corr: 0.85,
          },
        ],
        corrsDownstream: [
          {
            featureIdx: "L:6 N:224",
            humanInterp: "Forest scenes",
            corr: 0.88,
          },
          {
            featureIdx: "L:6 N:225",
            humanInterp: "Outdoor vegetation",
            corr: 0.82,
          },
          {
            featureIdx: "L:6 N:226",
            humanInterp: "Lush greenery",
            corr: 0.79,
          },
        ],
        images: [
          {
            url: "https://mindreader-web.s3.amazonaws.com/neuron-image-activation/neuron-9_FC1_828-image-78.jpg",
            patches: [
              {
                patchIdx: 0,
                zScore: 2.5,
                activation: 5.2,
              },
              {
                patchIdx: 1,
                zScore: 1.8,
                activation: 4.7,
              },
              {
                patchIdx: 2,
                zScore: 3.1,
                activation: 5.6,
              },
              {
                patchIdx: 3,
                zScore: 2.2,
                activation: 4.9,
              },
              {
                patchIdx: 4,
                zScore: 2.8,
                activation: 5.4,
              },
              {
                patchIdx: 5,
                zScore: 1.5,
                activation: 4.3,
              },
              {
                patchIdx: 6,
                zScore: 2.6,
                activation: 5.1,
              },
              {
                patchIdx: 7,
                zScore: 1.9,
                activation: 4.6,
              },
              {
                patchIdx: 8,
                zScore: 2.3,
                activation: 5.0,
              },
            ],
          },
          {
            url: "https://mindreader-web.s3.amazonaws.com/neuron-image-activation/neuron-9_FC1_828-image-78.jpg",
            patches: [
              {
                patchIdx: 0,
                zScore: 2.5,
                activation: 5.2,
              },
              {
                patchIdx: 1,
                zScore: 1.8,
                activation: 4.7,
              },
              {
                patchIdx: 2,
                zScore: 3.1,
                activation: 5.6,
              },
              {
                patchIdx: 3,
                zScore: 2.2,
                activation: 4.9,
              },
              {
                patchIdx: 4,
                zScore: 2.8,
                activation: 5.4,
              },
              {
                patchIdx: 5,
                zScore: 1.5,
                activation: 4.3,
              },
              {
                patchIdx: 6,
                zScore: 2.6,
                activation: 5.1,
              },
              {
                patchIdx: 7,
                zScore: 1.9,
                activation: 4.6,
              },
              {
                patchIdx: 8,
                zScore: 2.3,
                activation: 5.0,
              },
            ],
          },
          {
            url: "https://mindreader-web.s3.amazonaws.com/neuron-image-activation/neuron-9_FC1_828-image-78.jpg",
            patches: [
              {
                patchIdx: 0,
                zScore: 2.5,
                activation: 5.2,
              },
              {
                patchIdx: 1,
                zScore: 1.8,
                activation: 4.7,
              },
              {
                patchIdx: 2,
                zScore: 3.1,
                activation: 5.6,
              },
              {
                patchIdx: 3,
                zScore: 2.2,
                activation: 4.9,
              },
              {
                patchIdx: 4,
                zScore: 2.8,
                activation: 5.4,
              },
              {
                patchIdx: 5,
                zScore: 1.5,
                activation: 4.3,
              },
              {
                patchIdx: 6,
                zScore: 2.6,
                activation: 5.1,
              },
              {
                patchIdx: 7,
                zScore: 1.9,
                activation: 4.6,
              },
              {
                patchIdx: 8,
                zScore: 2.3,
                activation: 5.0,
              },
            ],
          },
        ],
      },
    ],
  };
  return res;
};
