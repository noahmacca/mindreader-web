import Image from "next/image";
import { fetchTopActivationsForNeuron } from "@/app/lib/data";
import Link from "next/link";
import ImageWithHeatmap from "@/app/lib/ui/ImageWithHeatmap";
import { renderActivation, prettifyClass } from "@/app/lib/helpers";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await fetchTopActivationsForNeuron(id, 100);
  if (data.length === 0) {
    throw new Error(`No neuron data found for id=${id}`);
  }
  const neuron = data[0].Neuron;

  return (
    <main className="flex min-h-screen flex-col p-24 w-xl">
      <div className="mt-12 mb-3">
        <Link href="/neuron" className="text-blue-600 hover:text-blue-800 mb-2">
          All Neurons
        </Link>
        <div className="text-4xl font-semibold">Neuron: {neuron.id}</div>
      </div>
      <div>Fires most strongly for: {neuron.topClasses}</div>

      <div className="flex flex-row flex-wrap mt-8">
        {data.map((activation, index) => (
          <Link
            href={`/image/${activation.Image.id}`}
            key={index}
            className="w-36 rounded overflow-hidden shadow-lg my-2 transition-transform duration-300 ease-in-out hover:-translate-y-0.5 cursor-pointer bg-gray-50 mr-2"
          >
            <ImageWithHeatmap
              imageData={activation.Image.data}
              heatmapData={activation.patchActivationsScaled}
            />
            <div className="px-2 py-1 text-xs text-gray-700">
              <div>{prettifyClass(activation.Image.label)}</div>
              <div>{renderActivation(activation.maxActivation)}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
