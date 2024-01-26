import Link from "next/link";
import { fetchTopActivationsForImage } from "@/app/lib/data";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation, prettifyClass } from "@/app/lib/helpers";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await fetchTopActivationsForImage(id, 100);

  if (data.numActivations === 0) {
    throw new Error(`No image data found for id=${id}`);
  }

  return (
    <main className="flex min-h-screen flex-col p-24 w-xl">
      <div className="mt-12 mb-3">
        <Link className="text-blue-600 hover:text-blue-800 mb-2" href="/neuron">
          All Neurons
        </Link>
        <div className="text-4xl font-semibold">
          Image: {prettifyClass(data.image.label)}
        </div>
      </div>
      <div>
        <span className="font-medium">ID:</span>
        <span> {data.image.id}</span>
      </div>
      <div>
        <span className="font-medium">Predicted: </span>
        <span>
          {" "}
          {prettifyClass(data.image.predicted)}{" "}
          {data.image.label === data.image.predicted ? (
            <span className="text-green-500">✅</span>
          ) : (
            <span className="text-red-500">❌</span>
          )}
        </span>
      </div>
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
    </main>
  );
}
