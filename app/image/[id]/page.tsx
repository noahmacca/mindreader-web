import Link from "next/link";
import { fetchTopActivationsForImage } from "@/app/lib/data";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation, prettifyClass } from "@/app/lib/helpers";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await fetchTopActivationsForImage(id, 50);

  if (data.length === 0) {
    throw new Error(`No image data found for id=${id}`);
  }

  const image = data[0].Image;
  return (
    <main className="flex min-h-screen flex-col p-24 w-xl">
      <div className="mt-12 mb-3">
        <Link className="text-blue-600 hover:text-blue-800 mb-2" href="/neuron">
          All Neurons
        </Link>
        <div className="text-4xl font-semibold">
          Image: {prettifyClass(image.label)}
        </div>
      </div>
      <div>
        <span className="font-medium">ID:</span>
        <span> {image.id}</span>
      </div>
      <div>
        <span className="font-medium">Predicted: </span>
        <span>
          {" "}
          {prettifyClass(image.predicted)}{" "}
          {image.label === image.predicted ? (
            <span className="text-green-500">✅</span>
          ) : (
            <span className="text-red-500">❌</span>
          )}
        </span>
      </div>
      <div className="flex flex-row flex-wrap space-x-4 mt-8">
        {data.map((activation, index) => (
          <Link
            href={`/neuron/${activation.Neuron.id}`}
            key={index}
            className="w-72 rounded overflow-hidden shadow-lg my-4 transition-transform duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer bg-gray-50"
          >
            <ImageWithHeatmap
              imageData={activation.Image.data}
              heatmapData={activation.patchActivationsScaled}
            />
            <div className="px-4 py-4">
              <div className="font-bold text-xl mb-2">
                {prettifyClass(activation.Image.label)}
              </div>
              <div className="text-md">
                <div className="flex justify-between">
                  <span className="font-medium">Neuron ID</span>
                  <span className="text-gray-700">{activation.Neuron.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Activation:</span>
                  <span className="text-gray-700">
                    {renderActivation(activation.maxActivation)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
