import { getNeuronLayers, getNeuronsForLayer } from "@/app/lib/data";
import Link from "next/link";
import NeuronPreviewCarousel from "@/app/lib/ui/NeuronPreviewCarousel";

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
            <div className="flex flex-row items-center mb-2 lg:mb-4">
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
          <div className="flex flex-col space-y-1 lg:space-y-2 rounded mb-2">
            {layer.neurons.map((neuronWithActivations) => (
              <div key={neuronWithActivations.id}>
                <NeuronPreviewCarousel
                  neuronWithActivations={neuronWithActivations}
                  shouldIndent={!isValidLayerIdPresent}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
