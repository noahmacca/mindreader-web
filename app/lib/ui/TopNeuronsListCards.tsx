import { getNeuronLayers, getNeuronsForLayer } from "@/app/lib/data";
import Link from "next/link";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation } from "@/app/lib/helpers";

export default async function TopNeuronsListCards() {
  const layersPresent = await getNeuronLayers();

  const topNeuronsForAllLayers = await Promise.all(
    layersPresent.map(async (layer) => ({
      name: layer,
      neurons: await getNeuronsForLayer(layer, 50, 10),
    }))
  );

  return (
    <div className="flex flex-col">
      {topNeuronsForAllLayers.map((layer) => (
        <div key={`layer-${layer.name}`} className="mb-24 w-full">
          <div className="text-md text-gray-500 mt-8">Layer</div>
          <div className="text-xl font-semibold">{layer.name}</div>
          <div className="grid gap-1 lg:gap-2 mt-1">
            {layer.neurons.map((neuron) => (
              <Link
                className="rounded overflow-hidden shadow-lg cursor-pointer bg-gray-50 hover:bg-gray-200 transform transition duration-200 ease-in-out"
                href={`/neuron/${neuron.id}`}
                key={`card-${neuron.id}`}
              >
                <div className="p-2 lg:p-4 text-sm">
                  <div className="flex space-x-1">
                    <span className="font-medium">Neuron: </span>
                    <span className="text-gray-700">{neuron.id}</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="font-medium">Max Activation: </div>
                    <div className="text-gray-700">
                      {renderActivation(neuron.maxActivation)}
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap mt-4">
                    {neuron.topActivations.map((activation, index) => (
                      <div
                        key={`key-${activation.id}`}
                        className="w-20 md:w-36 rounded mr-1 mb-1 lg:mr-3"
                      >
                        <ImageWithHeatmap
                          imageId={activation.Image.id}
                          neuronId={activation.Neuron.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
