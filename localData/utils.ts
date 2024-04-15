import {
  feature,
  image,
  neuronImageActivation,
  neuronImageActivationPatch,
  neuronCorrelation,
} from "./data";

export const getSampleFeatureData = (): any => {
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

export const getSampleTooltipInfoObjects = () => [
  { label: "Leaf", activation: 5.2, zScore: 1.5 },
  { label: "Grass", activation: 4.8, zScore: 1.2 },
  { label: "Branch", activation: 5.6, zScore: 1.8 },
  { label: "Flower", activation: 4.1, zScore: 0.9 },
  { label: "Stem", activation: 3.7, zScore: 0.6 },
  { label: "Petal", activation: 4.5, zScore: 1.1 },
  { label: "Bark", activation: 5.9, zScore: 2.1 },
  { label: "Twig", activation: 3.3, zScore: 0.4 },
  { label: "Bud", activation: 4.3, zScore: 1.0 },
  { label: "Vine", activation: 5.5, zScore: 1.7 },
  { label: "Foliage", activation: 6.1, zScore: 2.3 },
  { label: "Shrub", activation: 4.7, zScore: 1.3 },
  { label: "Moss", activation: 3.9, zScore: 0.7 },
  { label: "Fern", activation: 5.1, zScore: 1.4 },
  { label: "Frond", activation: 4.4, zScore: 0.8 },
  { label: "Stalk", activation: 5.8, zScore: 1.9 },
  { label: "Root", activation: 4.2, zScore: 0.9 },
  { label: "Trunk", activation: 5.4, zScore: 1.6 },
  { label: "Needle", activation: 3.8, zScore: 0.6 },
  { label: "Cone", activation: 4.6, zScore: 1.2 },
  { label: "Fruit", activation: 5.7, zScore: 1.9 },
  { label: "Seed", activation: 3.5, zScore: 0.5 },
  { label: "Nut", activation: 4.9, zScore: 1.3 },
  { label: "Husk", activation: 5.3, zScore: 1.5 },
  { label: "Shell", activation: 4.0, zScore: 0.8 },
  { label: "Kernel", activation: 5.0, zScore: 1.4 },
  { label: "Sprout", activation: 3.6, zScore: 0.4 },
  { label: "Seedling", activation: 4.8, zScore: 1.1 },
  { label: "Sapling", activation: 5.6, zScore: 1.8 },
  { label: "Shoot", activation: 4.4, zScore: 1.0 },
  { label: "Spore", activation: 3.2, zScore: 0.3 },
  { label: "Fungus", activation: 5.2, zScore: 1.6 },
  { label: "Lichen", activation: 4.6, zScore: 1.2 },
  { label: "Algae", activation: 3.8, zScore: 0.7 },
  { label: "Seaweed", activation: 5.4, zScore: 1.7 },
  { label: "Kelp", activation: 4.2, zScore: 0.9 },
  { label: "Coral", activation: 5.8, zScore: 2.0 },
  { label: "Reef", activation: 4.0, zScore: 0.8 },
  { label: "Anemone", activation: 5.0, zScore: 1.4 },
  { label: "Jellyfish", activation: 3.6, zScore: 0.5 },
  { label: "Plankton", activation: 4.8, zScore: 1.3 },
  { label: "Krill", activation: 5.6, zScore: 1.9 },
  { label: "Crustacean", activation: 4.4, zScore: 1.1 },
  { label: "Mollusk", activation: 3.2, zScore: 0.4 },
  { label: "Shellfish", activation: 5.2, zScore: 1.6 },
  { label: "Oyster", activation: 4.6, zScore: 1.2 },
  { label: "Clam", activation: 3.8, zScore: 0.7 },
  { label: "Mussel", activation: 5.4, zScore: 1.8 },
  { label: "Snail", activation: 4.2, zScore: 1.0 },
  { label: "Slug", activation: 3.4, zScore: 0.5 },
  { label: "Worm", activation: 5.0, zScore: 1.5 },
  { label: "Insect", activation: 4.8, zScore: 1.3 },
  { label: "Butterfly", activation: 5.6, zScore: 1.9 },
  { label: "Moth", activation: 4.4, zScore: 1.1 },
  { label: "Caterpillar", activation: 3.2, zScore: 0.4 },
  { label: "Cocoon", activation: 5.2, zScore: 1.7 },
  { label: "Chrysalis", activation: 4.6, zScore: 1.2 },
  { label: "Beetle", activation: 3.8, zScore: 0.8 },
  { label: "Ladybug", activation: 5.4, zScore: 1.8 },
  { label: "Dragonfly", activation: 4.2, zScore: 1.0 },
  { label: "Mantis", activation: 3.4, zScore: 0.6 },
  { label: "Grasshopper", activation: 5.0, zScore: 1.5 },
  { label: "Cricket", activation: 4.8, zScore: 1.4 },
  { label: "Cicada", activation: 5.6, zScore: 2.0 },
];
