import { getNeuronLayers, getNeuronsForLayer } from "@/app/lib/data";
import Link from "next/link";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation } from "@/app/lib/helpers";

export default async function Page() {
  const layersPresent = await getNeuronLayers();

  const topNeuronsForAllLayers = await Promise.all(
    layersPresent.map(async (layer) => ({
      name: layer,
      neurons: await getNeuronsForLayer(layer, 20, 8),
    }))
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-left mt-32 mb-4">
        Top Activating Neurons for TinyCLIP
      </h1>
      <div className="text-gray-700">
        These are the neurons that fire most strongly across our image dataset,
        for each layer of the model. The neuron fires most strongly for the
        parts of each image highlighted in yellow. You can hover your mouse over
        the image to reveal the original image, or click on one of the
        neuron&apos;s cards to see how it activated on even more images. Look
        out for high-level concepts the neuron consistently fires for across
        images!
      </div>
      {topNeuronsForAllLayers.map((layer) => (
        <div key={`layer-${layer.name}`} className="mb-24">
          <div className="text-xl font-semibold mt-12 mb-2">
            Layer: {layer.name}
          </div>
          {layer.neurons.map((neuron) => (
            <Link href={`/neuron/${neuron.id}`} key={`card-${neuron.id}`}>
              <div className="rounded overflow-hidden shadow-lg my-2 cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="px-4 py-4 text-sm">
                  <div className="flex space-x-1">
                    <span className="font-medium">Neuron: </span>
                    <span className="text-gray-700">{neuron.id}</span>
                  </div>
                  <div className="flex space-x-1">
                    <span className="font-medium">Max Activation: </span>
                    <span className="text-gray-700">
                      {renderActivation(neuron.maxActivation)}
                    </span>
                  </div>
                  <div className="flex flex-row flex-wrap mt-4">
                    {neuron.topActivations.map((activation, index) => (
                      <div
                        key={`key-${activation.id}`}
                        className="w-28 rounded mr-3"
                      >
                        <ImageWithHeatmap
                          imageData={activation.Image.data}
                          heatmapData={activation.patchActivationsScaled}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
