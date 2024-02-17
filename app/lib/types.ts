export type CorrNeuronsWithActivations = {
  upstreamCorrNeurons: NeuronWithActivationsType[];
  downstreamCorrNeurons: NeuronWithActivationsType[];
  sameLayerCorrNeurons: NeuronWithActivationsType[];
};

export type NeuronWithActivationsType = {
  topActivations: (NeuronImageActivation & {
    Neuron: Neuron;
    Image: Image;
  })[];
  id: string;
  topClasses?: string;
  maxActivation?: number;
  corr?: number;
};

import { NeuronImageActivation, Neuron, Image } from "@prisma/client";
