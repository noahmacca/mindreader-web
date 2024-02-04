import Link from "next/link";
import { fetchTopActivationsForImage } from "@/app/lib/data";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation } from "@/app/lib/helpers";

export default async function TopActivationsForImage({
  imageId,
}: {
  imageId: number;
}) {
  const data = await fetchTopActivationsForImage(imageId, 100);

  if (data.numActivations === 0) {
    throw new Error(`No image data found for id=${imageId}`);
  }

  return (
    <div>
      {data.layerActivations.map((layer) => (
        <div key={`layer-${layer.name}`}>
          <div className="text-3xl font-bold mt-12 mb-2">
            Layer: {layer.name}
          </div>
          <div className="flex flex-row flex-wrap">
            {layer.neuronActivations.map((activation, index) => (
              <Link
                href={`/neuron/${activation.Neuron.id}`}
                key={index}
                className="w-36 rounded overflow-hidden shadow-lg my-2 ml-2 transition-transform duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer bg-gray-50"
              >
                <ImageWithHeatmap
                  imageData={activation.Image.data}
                  heatmapData={activation.patchActivationsScaled}
                />
                <div className="px-2 py-1 text-xs text-gray-700">
                  <div>{activation.Neuron.id}</div>
                  <div>{renderActivation(activation.maxActivation)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
