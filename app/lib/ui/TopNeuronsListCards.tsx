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
      const neurons = await getNeuronsForLayer(layer, countNeuronsPerLayer, 18);
      topNeuronsForAllLayers.push({ name: layer, neurons });
    }
  } else if (isValidLayerIdPresent) {
    topNeuronsForAllLayers = [
      {
        name: layerId,
        neurons: await getNeuronsForLayer(layerId, countNeuronsPerLayer, 18),
      },
    ];
  } else {
    throw new Error(`Layer with id=${layerId} is not present.`);
  }

  return (
    <div className="flex flex-col mb-24">
      {topNeuronsForAllLayers.map((layer) => (
        <div key={`layer-${layer.name}`} className=" w-full my-8">
          {!isValidLayerIdPresent && (
            <div className="flex flex-row items-center mb-4">
              <div className="text-2xl lg:text-3xl font-semibold ">
                Layer {layer.name.split("_")[0]}
              </div>

              <Link href={`/layer/${layer.name}`}>
                <div className="text-xs lg:text-sm font-light ml-2 px-2 py-1 bg-purple-500 text-white text-center rounded cursor-pointer hover:bg-purple-600">
                  More
                </div>
              </Link>
            </div>
          )}
          <div
            className={`grid gap-1 lg:gap-2 mt-1 ${
              !isValidLayerIdPresent ? "ml-2 lg:ml-4" : ""
            }`}
          >
            {layer.neurons.map((neuron) => (
              <Link
                className="rounded overflow-hidden shadow-lg cursor-pointer bg-gray-50 hover:bg-gray-200 transform transition duration-200 ease-in-out"
                href={`/neuron/${neuron.id}`}
                key={`card-${neuron.id}`}
              >
                <div className="p-2 lg:px-4 text-sm">
                  <span className="font-medium">
                    Neuron {neuron.id.split("_").pop()}
                  </span>
                  <div className="flex flex-row overflow-x-auto mt-1">
                    {neuron.topActivations.map((activation, index) => (
                      <div
                        key={`key-${activation.id}`}
                        className="flex-none w-24 rounded mr-1 mb-1 lg:mr-2"
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
