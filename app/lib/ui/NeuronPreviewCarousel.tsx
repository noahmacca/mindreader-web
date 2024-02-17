"use-client";

import Link from "next/link";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";

import { NeuronWithActivationsType } from "@/app/lib/types";

export default function NeuronPreviewCarousel({
  neuronWithActivations,
  shouldIndent,
}: {
  neuronWithActivations: NeuronWithActivationsType;
  shouldIndent: boolean;
}) {
  return (
    <Link
      className="overflow-hidden cursor-pointer"
      href={`/neuron/${neuronWithActivations.id}`}
    >
      <div
        className={`p-2 lg:px-4 text-sm bg-gray-200 hover:bg-gray-300 rounded transition duration-200 ease-in-out ${
          shouldIndent ? "lg:ml-4" : ""
        }`}
      >
        <span className="font-medium">
          Layer {neuronWithActivations.id.split("_")[0]} Neuron{" "}
          {neuronWithActivations.id.split("_").pop()}
          <span className="text-gray-500">
            {neuronWithActivations.corr &&
              ` Correlation: ${neuronWithActivations.corr.toFixed(3)}`}
          </span>
        </span>
        <div className="flex flex-row overflow-x-auto mt-1">
          {neuronWithActivations.topActivations.map((activation, index) => (
            <div
              key={`key-${activation.id}`}
              className="flex-none w-20 lg:w-28 rounded mr-1 mb-1 lg:mr-2"
            >
              <ImageWithHeatmap
                imageId={activation.Image.id}
                neuronId={activation.Neuron.id}
                noHover
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
