import { getNeuronLayers, getNeuronsForLayer } from "@/app/lib/data";
import Link from "next/link";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation } from "@/app/lib/helpers";

export default async function TopNeuronsListCards() {
  const layersPresent = await getNeuronLayers();

  const topNeuronsForAllLayers = await Promise.all(
    layersPresent.map(async (layer) => ({
      name: layer,
      neurons: await getNeuronsForLayer(layer, 20, 8),
    }))
  );

  return (
    <div>
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
