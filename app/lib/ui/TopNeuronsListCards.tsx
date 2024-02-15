import { getNeuronLayers, getNeuronsForLayer } from "@/app/lib/data";
import Link from "next/link";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation } from "@/app/lib/helpers";

export default async function TopNeuronsListCards({
  layerId,
  countNeuronsPerLayer,
}: {
  layerId?: string;
  countNeuronsPerLayer: number;
}) {
  const layersPresent = (await getNeuronLayers()).sort();
  const isValidLayerIdPresent = layerId && layersPresent.includes(layerId);
  let topNeuronsForAllLayers;
  if (!layerId) {
    topNeuronsForAllLayers = [];
    for (const layer of layersPresent) {
      const neurons = await getNeuronsForLayer(layer, countNeuronsPerLayer, 10);
      topNeuronsForAllLayers.push({ name: layer, neurons });
    }
  } else if (isValidLayerIdPresent) {
    topNeuronsForAllLayers = [
      {
        name: layerId,
        neurons: await getNeuronsForLayer(layerId, countNeuronsPerLayer, 10),
      },
    ];
  } else {
    throw new Error(`Layer with id=${layerId} is not present.`);
  }

  return (
    <div className="flex flex-col mb-24">
      {topNeuronsForAllLayers.map((layer) => (
        <div key={`layer-${layer.name}`} className=" w-full my-12">
          {!isValidLayerIdPresent && (
            <>
              <div className="text-md text-gray-500 mt-8">Layer</div>
              <Link href={`/layer/${layer.name}`}>
                <div className="text-xl font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                  {layer.name}
                </div>
              </Link>
            </>
          )}
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
